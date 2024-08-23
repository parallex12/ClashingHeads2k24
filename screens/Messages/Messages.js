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
import { chatMenuOptions, getPercent } from "../../middleware";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChatSocketService } from "../../state-management/apiCalls/ChatSocketService";
import ContactsSheet from "../../globalComponents/ContactsSheet/ContactsSheet";
import { useNavigation } from "@react-navigation/native";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ChatApi from "../../ApisManager/ChatApi";
import { Instagram } from "react-content-loader/native";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [chats, setChats] = useState([]);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const currentUserId = currentUser?._id;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { receiveChat, listenreadMessages } = useChatSocketService();
  const contactsbottomSheetRef = useRef();
  const bottomFlagSheetRef = useRef();
  const { getCurrentUserChats, updateChatById } = new ChatApi();
  const { data, isLoading, isFetching, isError } = useQuery(
    ["user-chats"],
    getCurrentUserChats,
    { staleTime: 60000 }
  );

  const mutation = useMutation((data) => updateChatById(data?._id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user-chats"]);
    },
  });

  useEffect(() => {
    listenForChange();
    listenreadMessages((result) => {
      const { updatedChat } = result;
      console.log("result", updatedChat);
      // mutation.mutate(updatedChat);
    });
  }, [currentUserId]);

  const listenForChange = () => {
    receiveChat((message) => {
      const updatedChat = chats?.find((chat) => chat?._id === message?.chatId);
      if (updatedChat) {
        let isUserSender = currentUserId == message?.sender;
        updatedChat.lastMessage = message;
        updatedChat.unreadMessagesCount = {
          ...updatedChat.unreadMessagesCount,
          [currentUserId]: !isUserSender
            ? updatedChat.unreadMessagesCount[currentUserId] + 1
            : updatedChat.unreadMessagesCount[currentUserId],
        };
        console.log("updatedChat", updatedChat);
        // mutation.mutate(updatedChat);
      }
    });
  };

  const PlusIconButton = () => {
    const onPlusPress = () => {
      contactsbottomSheetRef.current.present();
      // props?.navigation.navigate("Connections", { user: currentUser });
    };

    return (
      <TouchableOpacity style={styles.plusIconButton} onPress={onPlusPress}>
        <Entypo name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };

  const onChatItemMenuSelect = (index, chat_data) => {
    let funcProps = {
      _id: chat_data?._id,
      ref: bottomFlagSheetRef,
      blockedUsers: chat_data?.blockedUsers,
    };
    let b_users = [...chat_data?.blockedUsers];
    // Check if the other user is already blocked or not
    const otherUserId = chat_data.otherUser?._id;
    if (b_users.includes(otherUserId)) {
      // If the user is already blocked, remove them from the blockedUsers list
      b_users = b_users.filter((userId) => userId !== otherUserId);
    } else {
      // If the user is not blocked, add them to the blockedUsers list
      b_users.push(otherUserId);
    }

    funcProps.blockedUsers = b_users;
    console.log(funcProps, index);

    chatMenuOptions[index].onPress(funcProps, () => {
      onRefresh();
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    console.log("refreshing..");
  };

  const memoizedChats = useMemo(() => {
    return data;
  }, [data]);

  const unReadMsgs = chats?.reduce((total, chat) => {
    const unreadCount = chat?.unreadMessagesCount?.[currentUserId] || 0;
    return total + unreadCount;
  }, 0);

  const onConnectUserChat = (user) => {
    navigation.navigate("ChatScreen", {
      chat_data: {
        participants: [currentUser, user],
        messages: [],
        _id: null,
      },
    });
  };

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
            {isLoading
              ? new Array(2).fill().map((item, index) => {
                  return (
                    <Instagram style={{ alignSelf: "center" }} key={index} />
                  );
                })
              : memoizedChats?.map((item, index) => {
                  return (
                    <MessageCard
                      onChatItemMenuSelect={onChatItemMenuSelect}
                      data={item}
                      key={index}
                    />
                  );
                })}
          </View>
        </View>
      </ScrollView>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <ContactsSheet
        callBackUser={onConnectUserChat}
        bottomSheetRef={contactsbottomSheetRef}
      />
    </View>
  );
};

export default Messages;
