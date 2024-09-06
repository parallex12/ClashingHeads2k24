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
import { getPercent } from "../../middleware";
import TypingComponent from "./components/TypingComponent";
import { useRoute } from "@react-navigation/native";
import Header from "./components/Header";
import { uploadMedia } from "../../middleware/firebase";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useSocket } from "../../ContextProviders/SocketContext";
import useChatMessages from "../../Hooks/useChatMessages";
import useChatSocket from "../../Hooks/useChatSocket";
import useUserProfile from "../../Hooks/useUserProfile";
import MessagesFlatlist from "../../globalComponents/MessagesFlatlist/MessagesFlatlist";
import { useAssets } from "expo-asset";
import crypto from "crypto-js";

const ChatScreen = (props) => {
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const socket = useSocket();
  const route = useRoute();
  const [assets, error] = useAssets([require("../../assets/chatbg.jpg")]);
  const loaded_chat_data = route.params?.chat_data;
  let { _id: roomId, user: otherUserData, participants } = loaded_chat_data;
  const currentUserId = useUserProfile()?.data?.user?._id;
  let { sendMessage, receiveMessage } = useChatSocket(
    roomId,
    currentUserId,
    participants
  );
  const [messages, setMessages] = useState([]);
  const chatMessagesQuery = useChatMessages(roomId);
  const voicebottomSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const [media, setMedia] = useState({});

  useEffect(() => {
    // Listen for new messages
    const handleMessage = (message) => {
      setMessages((prevMessages) => {
        let filterMsgs = prevMessages?.filter((e) => e?._id != message?._id);
        return [...filterMsgs, message];
      });
    };

    receiveMessage(handleMessage);

    return () => {
      receiveMessage((callback) => {
        socket.off("message", callback);
      });
    };
  }, []);
  const handleSend = async (messageData) => {
    let { newMessage, media } = messageData;
    try {
      let message_details = {
        _id: "demo",
        chatId: roomId,
        sender: currentUserId,
        message: newMessage,
        media,
        status: "sending",
      };
      if (media?.image) {
        setMessages((prev) => [...prev, message_details]);
        let { url } = await uploadMedia(media?.image, "messages/media");
        message_details["media"]["image"] = url;
      }
      if (media?.audio) {
        setMessages((prev) => [...prev, message_details]);
        let { url } = await uploadMedia(media?.audio, "messages/media");
        message_details["media"]["audio"] = url;
      }
      setMessages((prev) => {
        return prev?.filter((e) => e?._id != "demo");
      });
      sendMessage(message_details); // Emit the message via socket
    } catch (e) {
      console.log(e);
    }
  };

  const onMessageItemMenuSelect = (item, _id) => {
    let funcProps = {
      _id,
      ref: bottomFlagSheetRef,
      socket,
      setMedia,
    };
    item?.onPress(funcProps, () => {
      if (item?.title == "Delete") {
        chatMessagesQuery?.refetch();
        setMessages((prev) => {
          return prev?.filter((e) => e?._id != _id);
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          backButton
          data={otherUserData}
          containerStyles={{ height: getPercent(15, height) }}
          rightIcon={null}
        />
        <ImageBackground
          source={assets && assets[0]}
          style={styles.content}
          resizeMode="cover"
        >
          <MessagesFlatlist
            query={chatMessagesQuery}
            data={messages}
            currentUserId={currentUserId}
            onMenuSelect={onMessageItemMenuSelect}
          />
          <TypingComponent
            setMedia={setMedia}
            replyMsgContent={[chatMessagesQuery?.data, messages]
              .flat()
              ?.find((e) => e?._id == media?.reply)}
            media={media}
            voicebottomSheetRef={voicebottomSheetRef}
            onSend={handleSend}
            showBlockedText={false}
            isChatBlocked={false}
          />
        </ImageBackground>
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
