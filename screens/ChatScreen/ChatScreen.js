import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { generateChatId, getPercent } from "../../middleware";
import TypingComponent from "./components/TypingComponent";
import SenderMessage from "./components/SenderMessage";
import RecieverMessage from "./components/RecieverMessage";
import { useRoute } from "@react-navigation/native";
import Header from "./components/Header";
import { get_messages } from "../../state-management/apiCalls/chat";
import { useChatSocketService } from "../../state-management/apiCalls/ChatSocketService";
import { uploadMedia } from "../../middleware/firebase";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useQuery, useQueryClient } from "react-query";
import MessageApi from "../../ApisManager/MessageApi";
import ChatApi from "../../ApisManager/ChatApi";
import { useSocket } from "../../ContextProviders/SocketContext";

const ChatScreen = (props) => {
  const socket = useSocket();
  const {
    joinRoom,
    leaveRoom,
    listenreadMessages,
    receiveMessage,
    sendMessage,
  } = useChatSocketService();
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const currentUserId = currentUser?._id;
  const route = useRoute();
  const loaded_chat_data = route.params?.chat_data;
  let { _id, participants, sharedPost } = loaded_chat_data;
  const otherUserData = participants?.filter((e) => e?._id != currentUserId)[0];
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrollToEndOnUpdate, setScrollToEndOnUpdate] = useState(true);
  const roomIdRef = useRef(roomId);
  const voicebottomSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const [media, setMedia] = useState({});
  const [chatData, setChatData] = useState();
  const messageApi = new MessageApi();
  const chatapi = new ChatApi();

  let isChatBlockedForMe = chatData?.blockedUsers?.includes(currentUserId);
  let isChatBlockedForOtherUser = chatData?.blockedUsers?.includes(
    otherUserData?._id
  );
  const [isChatBlocked, setisChatBlocked] = useState(
    isChatBlockedForMe || isChatBlockedForOtherUser
  );
  let blockedTexts = ["You have blocked this user.", "You have been blocked."];
  let showBlockedText = isChatBlockedForOtherUser
    ? blockedTexts[0]
    : isChatBlockedForMe
    ? blockedTexts[1]
    : null;
  let sharedPostData = { ...sharedPost };

  // Reference to FlatList for scrolling
  const flatListRef = useRef(null);

  useEffect(() => {
    setMessages(loaded_chat_data?.messages);
    if (participants?.length > 0) {
      getMessages();
    }
    listenForMessage();

    listenreadMessages((result) => {
      let { unreadMessages } = result;
      setMessages((prevMessages) => {
        let readMessagesSet = new Set(unreadMessages?.map((i) => i?._id));

        return prevMessages.map((msg) =>
          readMessagesSet.has(msg._id) ? { ...msg, read: true } : msg
        );
      });
    });
    // socket.on("deleteMsg", (msgData) => {
    //   setMessages((prevMessages) => {
    //     let filterMsg = prevMessages?.filter((e) => e?._id != msgData?.msgId);
    //     return filterMsg;
    //   });
    // });
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
      leaveRoom(roomIdRef?.current);
    };
  }, [participants]);

  useEffect(() => {
    if (messages?.filter((e) => e?.read == false)?.length > 0) {
      socket.emit("readMessages", { chatId: _id, userId: currentUserId });
    }
  }, []);

  const listenForMessage = () => {
    receiveMessage((message) => {
      setMessages((prevMessages) => {
        // let filterMsgs = prevMessages?.filter((e) => e?._id != message?._id);
        // filterMsgs.push(message);
        console.log({ message, ...prevMessages });
        return [message];
      });
      // socket.emit("readMessages", { chatId: _id, userId: currentUserId });
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
    setisChatBlocked(isChatBlockedForMe || isChatBlockedForOtherUser);
    setScrollToEndOnUpdate(false); // Reset after scrolling
  }, [messages]);

  const getMessages = async () => {
    let _p = participants?.map((i) => i?._id);
    let _m = await chatapi.createChat({ participants: _p });
    console.log(_m);
    roomIdRef.current = _m?._id;
    setRoomId(_m?._id);
    joinRoom(_m?._id, currentUserId);
    setChatData(_m);
    setMessages(_m?.messages);
    setLoading(false);
    scrollToEnd();
  };

  const handleSend = async (messageData) => {
    let { newMessage, media } = messageData;
    try {
      let message_details = {
        chatId: roomId,
        sender: currentUserId,
        message: newMessage,
        media,
      };
      let _p = participants?.map((i) => i?._id);
      if (media?.image) {
        let { url } = await uploadMedia(media?.image, "messages/media");
        message_details["media"]["image"] = url;
      }
      if (media?.audio) {
        let { url } = await uploadMedia(media?.audio, "messages/media");
        message_details["media"]["audio"] = url;
      }
      sendMessage(roomId, message_details, _p); // Emit the message via socket
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

  const memoizeMessages = useMemo(() => {
    return messages;
  }, [messages]);

  const onMessageItemMenuSelect = (item, _id) => {
    let funcProps = {
      _id,
      ref: bottomFlagSheetRef,
      socket,
      setMedia,
    };
    item?.onPress(funcProps, () => null);
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
            data={memoizeMessages}
            renderItem={({ item, index }) => {
              let senderId = item?.sender?._id || item?.sender;
              const replyIndex = messages.findIndex(
                (e) => e?._id == item?.media?.reply
              );
              return senderId == currentUserId ? (
                <SenderMessage
                  flatListRef={flatListRef}
                  replyMsgContent={messages?.find(
                    (e) => e?._id == item?.media?.reply
                  )}
                  onMessageItemMenuSelect={onMessageItemMenuSelect}
                  data={item}
                  otherUserData={otherUserData}
                  replyIndex={replyIndex}
                />
              ) : (
                <RecieverMessage
                  flatListRef={flatListRef}
                  onMessageItemMenuSelect={onMessageItemMenuSelect}
                  replyMsgContent={messages?.find(
                    (e) => e?._id == item?.media?.reply
                  )}
                  data={item}
                  otherUserData={otherUserData}
                  replyIndex={replyIndex}
                />
              );
            }}
            keyExtractor={(item) => item._id}
            onEndReached={loadMoreMessages}
            onEndReachedThreshold={0.2}
            onScroll={handleScroll}
            inverted
            ListFooterComponent={
              loading && hasMore ? (
                <ActivityIndicator size="large" color="#222" />
              ) : null
            }
          />
        </ImageBackground>

        <TypingComponent
          setMedia={setMedia}
          replyMsgContent={messages?.find((e) => e?._id == media?.reply)}
          otherUserData={otherUserData}
          media={media}
          voicebottomSheetRef={voicebottomSheetRef}
          onSend={handleSend}
          showBlockedText={showBlockedText}
          isChatBlocked={isChatBlocked}
        />
      </KeyboardAvoidingView>
      <UpdatedVoiceRecorderBottomSheet
        postId={null}
        clashTo={null}
        onPostClash={(d) =>
          setMedia((prev) => ({ ...prev, audio: d?.recording }))
        }
        bottomVoiceSheetRef={voicebottomSheetRef}
        postBtnTitle="Confirm"
      />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default ChatScreen;
