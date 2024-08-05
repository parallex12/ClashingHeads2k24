import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ChatScreen/main";
import { getPercent } from "../../middleware";
import TypingComponent from "./components/TypingComponent";
import SenderMessage from "./components/SenderMessage";
import RecieverMessage from "./components/RecieverMessage";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import Header from "./components/Header";
import {
  create_get_user_chat,
  get_messages,
} from "../../state-management/apiCalls/chat";
import { useChatSocketService } from "../../state-management/apiCalls/ChatSocketService";
import { useSocket } from "../../state-management/apiCalls/SocketContext";

const ChatScreen = (props) => {
  const socket = useSocket();
  const { joinRoom, leaveRoom, readMessages, receiveMessage, sendMessage } =
    useChatSocketService();
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?._id;
  const route = useRoute();
  const loaded_chat_data = route.params?.chat_data;
  let { _id, participants } = loaded_chat_data;
  const otherUserData = participants?.filter((e) => e?._id != currentUserId)[0];
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrollToEndOnUpdate, setScrollToEndOnUpdate] = useState(true);

  // Reference to FlatList for scrolling
  const flatListRef = useRef(null);

  useEffect(() => {
    setMessages(loaded_chat_data?.messages);
    if (participants?.length > 0) {
      getMessages();
    }
    listenForMessage();
    socket.on("messagesRead", (updatedMessages) => {
      setMessages((prevMessages) => {
        const updatedMessagesMap = new Map(
          updatedMessages.map((msg) => [msg._id, msg])
        );

        return prevMessages.map((msg) =>
          updatedMessagesMap.has(msg._id)
            ? updatedMessagesMap.get(msg._id)
            : msg
        );
      });
    });

    // Add keyboard event listeners
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      scrollToEnd
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      scrollToEnd
    );

    return () => {
      // Clean up keyboard event listeners
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [participants]);

  const listenForMessage = () => {
    receiveMessage((message) => {
      setMessages((prevMessages) => {
        let filterMsgs = prevMessages?.filter((e) => e?._id != message?._id);
        return [message, ...filterMsgs];
      });
      if (roomId) {
        console.log(roomId);
        readMessages(roomId, currentUserId);
      }
      // Scroll to end when new messages arrive if needed
      if (scrollToEndOnUpdate) {
        scrollToEnd();
      }
    });
  };

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 1 });
    }
  };

  useEffect(() => {
    if (scrollToEndOnUpdate) {
      scrollToEnd();
    }
    setScrollToEndOnUpdate(false); // Reset after scrolling
  }, [messages]);

  const getMessages = async () => {
    let _p = participants?.map((i) => i?._id);
    let _m = await create_get_user_chat({ participants: _p });
    setRoomId(_m?._id);
    joinRoom(_m?._id);
    setMessages(_m?.messages);
    readMessages(_m?._id, currentUserId);
    setLoading(false);
    scrollToEnd();
  };

  const handleSend = async (message) => {
    try {
      let message_details = {
        chatId: roomId,
        sender: currentUserId,
        message,
      };
      // await send_message(message_details);
      sendMessage(roomId, message_details); // Emit the message via socket
    } catch (e) {
      console.log(e);
    }
  };

  const loadMoreMessages = async () => {
    if (hasMore && !loading) {
      setLoading(true);

      try {
        // Fetch new messages
        let fetchedMessages = await get_messages(roomId, page, 10);

        // Create a set of existing message IDs to avoid duplicates
        const existingMessageIds = new Set(messages.map((msg) => msg._id));

        // Filter out duplicate messages
        const uniqueFetchedMessages = fetchedMessages.filter(
          (msg) => !existingMessageIds.has(msg._id)
        );

        if (uniqueFetchedMessages.length === 0) {
          setHasMore(false);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            ...uniqueFetchedMessages,
          ]);
          setPage(page + 1);
        }
      } catch (error) {
        console.error("Error loading more messages:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const isAtTop = contentOffset.y <= 0;
    if (isAtTop) {
      loadMoreMessages();
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
            ref={flatListRef}
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
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.2}
            onScroll={handleScroll}
            inverted
            ListFooterComponent={
              loading && hasMore ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : null
            }
          />
        </ImageBackground>
        <TypingComponent onSend={handleSend} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
