import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TypingComponentExtraViewerStyles as _styles } from "../../../styles/Global/main";
import { useQueryClient } from "react-query";
import useUserProfile from "../../../Hooks/useUserProfile";

const ReplyCard = (props) => {
  let { content, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;

  let username =
    content?.sender == currentUser?._id ? "You" : content?.sender?.username;
  if (!content) return null;

  let isImage = content?.media?.image;
  let isAudio = content?.media?.audio;
  let isReply = content?.media?.reply;
  let msgText = content?.message;
  let texts = [
    msgText,
    "Sent a photo",
    "Send an audio",
    `Replied to:${msgText}`,
  ];

  let textToShow = isImage
    ? texts[1]
    : isAudio
    ? texts[2]
    : isReply
    ? texts[3]
    : texts[0];

  return (
    <TouchableOpacity
      style={styles.replyCardWrapper}
      onPress={() => onPress(content)}
    >
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.msg}>{textToShow}</Text>
    </TouchableOpacity>
  );
};

export default ReplyCard;
