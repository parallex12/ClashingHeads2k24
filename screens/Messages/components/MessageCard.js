import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { chatMenuOptions, formatTime, getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { Facebook } from "react-content-loader/native";
import CacheImage from "../../../globalComponents/CacheImage";
import ContextMenu from "react-native-context-menu-view";

const Profile = ({ source, user, isUserMe }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();

  const onProfilePress = () => {
    if (isUserMe) {
      navigation?.navigate("MyProfile");
    } else {
      navigation?.navigate("UserProfile", {
        user,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileWrapper} onPress={onProfilePress}>
        <CacheImage
          source={source}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          hash={user?.profile_hash}
        />
      </TouchableOpacity>
      {user?.status == "online" && <View style={styles.online}></View>}
    </View>
  );
};

const MessageCard = (props) => {
  let { data, onChatItemMenuSelect } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  let { messages, unreadMessagesCount, lastMessage, _id } = data || {};
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?._id;
  let otherUser = data?.participants?.filter((e) => e?._id != currentUserId)[0];
  let isUserMe = otherUser?._id == currentUser?._id;
  let unRead = unreadMessagesCount[currentUserId];
  let hasMedia = lastMessage?.media;

  const onCardPress = () => {
    navigation.navigate("ChatScreen", { chat_data: data });
  };

  if (loading) {
    return <Facebook />;
  }
  if (!lastMessage) return null;

  const onMessageItemMenuSelect = (e) => {
    const index = e.nativeEvent.index;
    onChatItemMenuSelect(index, data?._id);
  };

  return (
    <ContextMenu
      actions={chatMenuOptions}
      onPress={onMessageItemMenuSelect}
      previewBackgroundColor="#fff"
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={onCardPress}
      >
        <Profile
          source={{
            uri:
              otherUser?.profile_photo ||
              "https://dentalia.orionthemes.com/demo-1/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750.jpg",
          }}
          user={otherUser}
          isUserMe={isUserMe}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.titleName}>{otherUser?.realName}</Text>
          <Text style={styles.slugText} numberOfLines={1}>
            {hasMedia?.image
              ? "Sent an image."
              : hasMedia?.audio
              ? "Sent an audio"
              : lastMessage?.message}
          </Text>
        </View>
        <View style={styles.rightActions}>
          <Text style={styles.timeText}>
            {formatTime(lastMessage?.createdAt)}
          </Text>
          {unRead > 0 && (
            <View style={styles.counterWrapper}>
              <Text style={styles.counterText}>{unRead}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </ContextMenu>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(6, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(0.6, height),
      paddingVertical: getPercent(0.6, height),
      paddingHorizontal: getPercent(2, width),
    },
    profileWrapper: {
      width: getPercent(5.4, height),
      height: getPercent(5.4, height),
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 1,
    },
    online: {
      width: getPercent(1.5, height),
      height: getPercent(1.5, height),
      borderRadius: 100,
      borderWidth: 1,
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#6FCF97",
      borderColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    infoWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(2, width),
    },
    titleName: font(17, "#111827", "Medium", 2, null, { marginRight: 10 }),
    slugText: font(15, "#111827", "Regular", 3),
    rightActions: {
      flex: 0.3,
      height: getPercent(6, height),
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingVertical: 1,
    },
    timeText: font(14, "#6B7280", "Regular", 0),
    counterWrapper: {
      minWidth: getPercent(6, width),
      minHeight: getPercent(6, width),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      padding: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    counterText: font(13, "#FFFFFF", "Medium"),
  });

export default MessageCard;
