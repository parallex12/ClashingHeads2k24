import { View, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { ClashCardStyles, font } from "../../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../globalComponents/PostCard/components/Header";
import Content from "../../../globalComponents/PostCard/components/Content";
import ActionMenu from "./card_components/ActionMenu";
import { stickerArr } from "../../../utils";
import { updateClashReaction } from "../../../state-management/features/singlePost/singlePostSlice";

const ClashCard = (props) => {
  let { data, onPostClashesPress, hrLine, onReportPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const userId = 1; // replace with actual user ID from your auth state

  let localmedia =
    data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null;

  const handleReaction = (reactionType) => {
    dispatch(updateClashReaction(data, userId, reactionType));
  };

  const onAudioPlay = () => {
    // let audioViews = { ...data?.listened } || {};
    // if (!audioViews[userId]) {
    //   audioViews[userId] = true
    //   dispatch(
    //     updateClashDetails(data?.postId, data?.id, { listened: audioViews })
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      {hrLine && <View style={styles.hrLine}></View>}
      <View style={styles.content}>
        <Header author={data?.author} createdAt={data?.createdAt} />
        <View style={styles.contentCardWrapper}>
          <Content
            showDuration
            onAudioPlay={onAudioPlay}
            noaudioreset
            sticker={localmedia}
            {...data}
            postDesc={false}
            title={false}
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
