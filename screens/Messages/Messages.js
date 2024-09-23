import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Messages/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { chatMenuOptions, generateChatId, getPercent } from "../../middleware";
import { Entypo } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useEffect, useRef } from "react";
import ContactsSheet from "../../globalComponents/ContactsSheet/ContactsSheet";
import { useNavigation } from "@react-navigation/native";
import useChat from "../../Hooks/useChat";
import InfiniteFlatlist from "../../globalComponents/InfiniteFlatlist/InfiniteFlatlist";
import { useSocket } from "../../ContextProviders/SocketContext";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";
import useUserProfile from "../../Hooks/useUserProfile";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const currentUserId = currentUser?._id || "";
  const navigation = useNavigation();
  const contactsbottomSheetRef = useRef();
  const chatQuery = useChat(currentUser?._id);
  const socket = useSocket();

  useEffect(() => {
    socket.on("screenchats", (chat) => chatQuery.refetch());
    return () => {
      socket.off("screenchats");
    };
  }, []);

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

    chatMenuOptions[index].onPress(funcProps, () => {
      chatQuery.refetch();
    });
  };

  const unReadMsgs = chatQuery?.data?.reduce((total, chat) => {
    const unreadCount = chat?.unreadMessagesCount?.[currentUserId] || 0;
    return total + unreadCount;
  }, 0);

  const onConnectUserChat = (user) => {
    let chatId = generateChatId([currentUserId, user?._id]);
    navigation.navigate("ChatScreen", {
      chat_data: {
        _id: chatId,
        user,
        participants: [currentUserId, user?._id],
      },
    });
  };

  return (
    <FlagReportSheetProvider>
      <View style={styles.container}>
        <StandardHeader
          title="Direct Message"
          containerStyles={{ height: getPercent(15, height) }}
          rightIcon={<PlusIconButton />}
        />

        <InfiniteFlatlist
          ListHeaderComponent={
            <>
              <View style={styles.searchHeader}>
                <SearchBar />
                {/* <TouchableOpacity style={styles.sortIcon}>
              <Ionicons name="filter" size={RFValue(22)} color="#111827" />
            </TouchableOpacity> */}
              </View>
              <View style={styles.buttonsWrapper}>
                <Text style={font(14, "#6B7280", "Medium")}>
                  Unread messages ({unReadMsgs || 0})
                </Text>
                <TouchableOpacity style={styles.groupsBtn}>
                  <Text style={font(14, "#000000", "Medium")}>Groups</Text>
                  <View style={styles.groupsBtnNumberWrapper}>
                    <Text style={font(10, "#fff", "Medium")}>0</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          }
          query={chatQuery}
          renderItem={({ item, index }) => (
            <MessageCard
              onChatItemMenuSelect={onChatItemMenuSelect}
              data={item}
              key={index}
              onCardPress={onConnectUserChat}
            />
          )}
        />

        <ContactsSheet
          callBackUser={onConnectUserChat}
          bottomSheetRef={contactsbottomSheetRef}
        />
      </View>
    </FlagReportSheetProvider>
  );
};

export default Messages;
