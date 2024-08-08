import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Messages/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { RFValue } from "react-native-responsive-fontsize";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { get_user_chats } from "../../state-management/apiCalls/chat";
import { useSocket } from "../../state-management/apiCalls/SocketContext";
import { useChatSocketService } from "../../state-management/apiCalls/ChatSocketService";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [chats, setChats] = useState([]);
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?._id;
  const socket = useSocket();
  const [refreshing, setRefreshing] = useState(false);
  const { receiveChat, listenreadMessages } = useChatSocketService();

  const fetchChats = async () => {
    const chats = await get_user_chats(currentUserId);
    setChats(chats);
    setRefreshing(false);
  };

  useEffect(() => {
    if (chats?.length == 0) {
      // fetchChats();
      setChats(currentUser?.chats);
    }
    listenForChange();
    listenreadMessages((result) => {
      const { updatedChat } = result;
      setChats((prevChats) => {
        // Filter out the old version of the chat if it exists
        const updatedChats = prevChats.filter(
          (chat) => chat._id !== updatedChat._id
        );
        // Add the updated chat
        updatedChats.push(updatedChat);
        // Return the updated chat list
        return updatedChats;
      });
    });
    // return () => {
    //   console.log("disconnected");
    //   socket.off("screenchats"); // Cleanup listener on unmount
    // };
  }, [currentUserId]);

  const listenForChange = () => {
    receiveChat((message) => {
      console.log("recieved Screen", message);
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat?._id === message?.chatId) {
            let isUserSender = currentUserId == message?.sender;
            // Increment unread messages count
            const updatedUnreadMessagesCount = {
              ...chat.unreadMessagesCount,
              [currentUserId]: !isUserSender
                ? chat.unreadMessagesCount[currentUserId] + 1
                : chat.unreadMessagesCount[currentUserId],
            };
            return {
              ...chat,
              lastMessage: message,
              unreadMessagesCount: updatedUnreadMessagesCount,
            };
          }
          return chat;
        });

        return updatedChats;
      });
    });
  };

  const PlusIconButton = () => {
    const onPlusPress = () => {
      props?.navigation.navigate("Connections", { user: currentUser });
    };

    return (
      <TouchableOpacity style={styles.plusIconButton} onPress={onPlusPress}>
        <Entypo name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  const memoizedChats = useMemo(() => {
    return chats;
  }, [chats]);

  const unReadMsgs = chats?.reduce((total, chat) => {
    const unreadCount = chat?.unreadMessagesCount?.[currentUserId] || 0;
    return total + unreadCount;
  }, 0);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Direct Message"
        containerStyles={{ height: getPercent(15, height) }}
        rightIcon={<PlusIconButton />}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <View style={styles.searchHeader}>
            <SearchBar />
            {/* <TouchableOpacity style={styles.sortIcon}>
              <Ionicons name="filter" size={RFValue(22)} color="#111827" />
            </TouchableOpacity> */}
          </View>
          <View style={styles.buttonsWrapper}>
            <Text style={font(15, "#6B7280", "Medium")}>
              Unread messages ({unReadMsgs || 0})
            </Text>
            <TouchableOpacity style={styles.groupsBtn}>
              <Text style={font(15, "#000000", "Medium")}>Groups</Text>
              <View style={styles.groupsBtnNumberWrapper}>
                <Text style={font(13, "#fff", "Medium")}>0</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.messagesWrapper}>
            {memoizedChats?.map((item, index) => {
              return <MessageCard data={item} key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Messages;
