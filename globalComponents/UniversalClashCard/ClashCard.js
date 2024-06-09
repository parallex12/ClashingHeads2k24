import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import auth from "@react-native-firebase/auth";
import { ClashCardStyles } from "../../styles/Global/main";
import { updateClashDetails, updateClashReaction } from "../../state-management/features/singlePost/singlePostSlice";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { stickerArr } from "../../utils";

const ClashCard = (props) => {
  let { data, onPostClashesPress, hrLine, onReportPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const userId = auth().currentUser?.uid; // replace with actual user ID from your auth state

  let localmedia =
    data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null;

  const handleReaction = (reactionType) => {
    dispatch(updateClashReaction(data, userId, reactionType));
  };

  const onAudioPlay = () => {
    let audioViews = { ...data?.listened } || {};
    if (!audioViews[userId]) {
      audioViews[userId] = true
      dispatch(
        updateClashDetails(data?.postId, data?.id, { listened: audioViews })
      );
    }
  };

  let userMention = data?.clashTo != "post" ? data?.clashTo?.author?.username : null



  return (
    <View style={styles.container}>
      {hrLine && <View style={styles.hrLine}></View>}
      <View style={styles.content}>
        <Header author={data?.author} createdAt={data?.createdAt} />
        <View style={styles.contentCardWrapper}>
          <Content
            userMention={userMention}
            onAudioPlay={onAudioPlay}
            sticker={localmedia}
            {...data}
          />
          <ActionMenu
            onPostClashesPress={onPostClashesPress}
            {...data}
            onReportPress={onReportPress}
            handleReaction={handleReaction}
          />
        </View>
      </View>
    </View>
  );
};

export default ClashCard;
