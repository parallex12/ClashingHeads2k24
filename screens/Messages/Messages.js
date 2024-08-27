import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Messages/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { chatMenuOptions, getPercent } from "../../middleware";
import { Entypo } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useRef } from "react";
import ContactsSheet from "../../globalComponents/ContactsSheet/ContactsSheet";
import { useNavigation } from "@react-navigation/native";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useQueryClient } from "react-query";
import useChat from "../../Hooks/useChat";
import InfiniteFlatlist from "../../globalComponents/InfiniteFlatlist/InfiniteFlatlist";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const currentUserId = currentUser?._id;
  const navigation = useNavigation();
  const contactsbottomSheetRef = useRef();
  const bottomFlagSheetRef = useRef();
  const chatQuery = useChat(currentUserId);

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

    chatMenuOptions[index].onPress(funcProps, () => {
      // onRefresh();
    });
  };

  const unReadMsgs = chatQuery?.data?.reduce((total, chat) => {
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
          </>
        }
        query={chatQuery}
        renderItem={({ item, index }) => (
          <MessageCard
            itemActions={{ onChatItemMenuSelect }}
            data={item}
            key={index}
          />
        )}
      />

      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <ContactsSheet
        callBackUser={onConnectUserChat}
        bottomSheetRef={contactsbottomSheetRef}
      />
    </View>
  );
};

export default Messages;
