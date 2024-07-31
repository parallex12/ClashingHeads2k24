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
import { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";
import { ClashCardStyles } from "../../styles/Global/main";
import {
  updateClashDetails,
  updateClashReaction,
} from "../../state-management/features/singlePost/singlePostSlice";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { stickerArr } from "../../utils";
import {
  updateSubClashDetails,
  updateSubClashReaction,
} from "../../state-management/features/challengeClash/challengeClashSlice";
import { fetchInstantUserById } from "../../state-management/features/searchedUsers/searchedUsersSlice";
import { Instagram } from "react-content-loader/native";

const ClashCard = (props) => {
  let { data, onPostClashesPress, challengeClash, hrLine, onReportPress } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const userId = auth().currentUser?.uid; // replace with actual user ID from your auth state
  const [singleUser, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  let localmedia =
    data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null;

  useEffect(() => {
    (async () => {
      let author_data = await fetchInstantUserById(data?.author);
      setAuthor(author_data);
      setLoading(false);
    })();
  }, [data]);

  const handleReaction = (reactionType) => {
    if (challengeClash) {
      dispatch(updateSubClashReaction(data, userId, reactionType));
    } else {
      dispatch(updateClashReaction(data, userId, reactionType));
    }
  };

  const onAudioPlay = () => {
    let audioViews = { ...data?.listened } || {};
    if (!audioViews[userId]) {
      audioViews[userId] = true;
      if (challengeClash) {
        dispatch(
          updateSubClashDetails(data?.postId, data?.id, {
            listened: audioViews,
          })
        );
      } else {
        dispatch(
          updateClashDetails(data?.postId, data?.id, { listened: audioViews })
        );
      }
    }
  };

  let userMention =
    data?.clashTo != "post" ? data?.clashTo?.author?.username : null;

  if (loading) {
    return <Instagram style={{ alignSelf: "center" }} />;
  }

  return (
    <View style={styles.container}>
      {hrLine && <View style={styles.hrLine}></View>}
      <View style={styles.content}>
        <Header author={singleUser || {}} createdAt={data?.createdAt} />
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
