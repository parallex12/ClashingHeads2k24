import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ChatScreen/main";
import { generateChatId, getPercent } from "../../middleware";
import TypingComponent from "./components/TypingComponent";
import SenderMessage from "./components/SenderMessage";
import RecieverMessage from "./components/RecieverMessage";
import { useRoute } from "@react-navigation/native";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import StandardHeader2 from "../../globalComponents/StandardHeader2/StandardHeader2";
import Header from "./components/Header";
import { fetchInstantUserById } from "../../state-management/features/searchedUsers/searchedUsersSlice";
import {
  create_get_user_chat,
  get_messages,
  send_message,
} from "../../state-management/apiCalls/chat";

const ChatScreen = (props) => {
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?._id;
  const route = useRoute();
  const loaded_chat_data = route.params?.chat_data;
  let { _id, participants } = loaded_chat_data;
  const otherUserData = participants?.filter((e) => e?._id != currentUserId)[0];
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages(loaded_chat_data?.messages);
    if (participants?.length > 0) {
      getMessages();
    }
  }, [participants]);

  const getMessages = async () => {
    let _p = participants?.map((i) => i?._id);
    let _m = await create_get_user_chat({participants:_p});
    setMessages(_m?.messages);
  };

  const handleSend = async (message) => {
    try {
      let message_details = {
        chatId: _id,
        sender: currentUserId,
        message,
      };
      setMessages((prev) => [...prev, message_details]);
      await send_message(message_details);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        backButton
        data={otherUserData}
        containerStyles={{ height: getPercent(15, height) }}
        rightIcon={null}
      />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ImageBackground
          source={require("../../assets/chatbg.jpg")}
          style={styles.content}
          resizeMode="cover"
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={({ item }) => {
              let senderId = item?.sender?._id || item?.sender;
              return senderId === currentUserId ? (
                <SenderMessage data={item} />
              ) : (
                <RecieverMessage data={item} />
              );
            }}
            keyExtractor={(item) => item._id}
            inverted
          />
        </ImageBackground>
        <TypingComponent onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
