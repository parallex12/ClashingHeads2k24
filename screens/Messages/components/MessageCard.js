import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Facebook } from "react-content-loader/native";
import ContextMenu from "react-native-context-menu-view";
import { chatMenuOptions, formatTime, getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import FastImage from "react-native-fast-image";
import useUserProfile from "../../../Hooks/useUserProfile";

const Profile = ({ source, user, isUserMe }) => {
  const { width, height } = useWindowDimensions();
  const styles = createProfileStyles({ width, height });
  const navigation = useNavigation();

  const onProfilePress = () => {
    navigation.navigate(isUserMe ? "MyProfile" : "UserProfile", { user });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileWrapper} onPress={onProfilePress}>
        <FastImage
          source={{ ...source, priority: FastImage.priority.normal }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          defaultSource={require("../../../assets/icon.png")}
        />
      </TouchableOpacity>
      {user?.status === "online" && <View style={styles.online} />}
    </View>
  );
};

const MessageCard = ({ data, onChatItemMenuSelect, onCardPress }) => {
  const { width, height } = useWindowDimensions();
  const styles = createMessageCardStyles({ width, height });
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const [loading, setLoading] = useState(false);
  const { unreadMessagesCount, lastMessage } = data || {};
  const currentUserId = currentUser?._id;
  const otherUser = data?.participants?.find((e) => e?._id !== currentUserId) || currentUser;
  const isUserMe = otherUser?._id === currentUserId;
  const unRead = unreadMessagesCount[currentUserId];
  const hasMedia = lastMessage?.media;
  const isChatBlockedForMe = data?.blockedUsers?.includes(currentUserId);
  const isChatBlockedForOtherUser = data?.blockedUsers?.includes(
    otherUser?._id
  );

  const blockedTexts = [
    "You have blocked this user.",
    "You have been blocked.",
  ];
  const showBlockedText = isChatBlockedForOtherUser
    ? blockedTexts[0]
    : isChatBlockedForMe
    ? blockedTexts[1]
    : null;

  if (loading) return <Facebook />;
  if (!lastMessage) return null;

  const onMessageItemMenuSelect = (e) => {
    const index = e.nativeEvent.index;
    const updatedData = { ...data, otherUser };
    onChatItemMenuSelect(index, updatedData);
  };

  const computeActions = () => {
    return chatMenuOptions?.map((e) => {
      if (e?.title === "Block" || e?.title === "Unblock") {
        return {
          ...e,
          title:
            isChatBlockedForMe || isChatBlockedForOtherUser
              ? "Unblock"
              : "Block",
        };
      }
      return e;
    });
  };

  const updatedActions = computeActions();

  return (
    <ContextMenu
      actions={updatedActions}
      onPress={onMessageItemMenuSelect}
      previewBackgroundColor="#fff"
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={() => onCardPress(otherUser)}
      >
        <Profile
          source={{
            uri: otherUser?.profile_photo,
          }}
          user={otherUser}
          isUserMe={isUserMe}
        />
        <View style={styles.infoWrapper}>
          <Text style={styles.titleName}>{otherUser?.realName}</Text>
          <Text style={styles.slugText} numberOfLines={1}>
            {showBlockedText ||
              (hasMedia?.image
                ? "Sent an image."
                : hasMedia?.audio
                ? "Sent an audio"
                : lastMessage?.message)}
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

const createProfileStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      position: "relative",
    },
    profileWrapper: {
      width: getPercent(5.4, height),
      height: getPercent(5.4, height),
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 1,
    },
    profileImage: {
      width: "100%",
      height: "100%",
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
  });

const createMessageCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(6, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(0.6, height),
      paddingVertical: getPercent(0.6, height),
      paddingHorizontal: getPercent(3, width),
    },
    infoWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(2, width),
    },
    titleName: font(14, "#111827", "Medium", 2, null, { marginRight: 10 }),
    slugText: font(12, "#111827", "Regular", 3),
    rightActions: {
      flex: 0.3,
      height: getPercent(6, height),
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingVertical: 1,
    },
    timeText: font(11, "#6B7280", "Regular", 0),
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
