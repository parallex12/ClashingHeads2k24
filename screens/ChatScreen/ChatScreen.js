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

const ChatScreen = (props) => {
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?.id;
  const route = useRoute();
  const userId = route.params?.userId;
  const otherUserData = route.params?.otherUserData;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [other_UserData, setOtherUserData] = useState(otherUserData);

  useEffect(() => {
    (async () => {
      if (otherUserData) return;
      let other_user_data = await fetchInstantUserById(userId);
      setLoading(false);
      setOtherUserData(other_user_data);
    })();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const initializeChat = async () => {
      if (!currentUserId) return;
      const chatId = generateChatId(currentUserId, userId);
      setChatId(chatId);

      const db = getFirestore();
      const chatRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(chatRef);

      if (!docSnap.exists()) {
        await setDoc(chatRef, {
          participants: [currentUserId, userId].sort(),
          createdAt: serverTimestamp(),
        });
      }

      const messagesRef = collection(db, "chats", chatId, "messages");
      const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

      // Return the unsubscribe function directly
      return onSnapshot(messagesQuery, (snapshot) => {
        const messagesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesList);
        setLoading(false);
      });
    };

    let unsubscribe;
    initializeChat().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, currentUserId, otherUserData]);

  const handleSend = async (message) => {
    const db = getFirestore();
    const messagesRef = collection(db, "chats", chatId, "messages");

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      userId: currentUserId,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        backButton
        data={other_UserData}
        containerStyles={{ height: getPercent(15, height) }}
        rightIcon={null}
      />
      {!chatId || loading ? (
        <ActivityIndicator />
      ) : (
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
                return item.userId === currentUserId ? (
                  <SenderMessage data={item} />
                ) : (
                  <RecieverMessage data={item} />
                );
              }}
              keyExtractor={(item) => item.id}
              inverted
            />
          </ImageBackground>
          <TypingComponent onSend={handleSend} />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default ChatScreen;
