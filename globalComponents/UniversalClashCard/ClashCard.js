import { View, useWindowDimensions } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ClashCardStyles } from "../../styles/Global/main";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { stickerArr } from "../../utils";
import { Instagram } from "react-content-loader/native";
import ClashApi from "../../ApisManager/ClashApi";
import FlagReportSheetContext from "../BottomSheet/FlagReportSheetProvider";
import useUserProfile from "../../Hooks/useUserProfile";

const ClashCard = (props) => {
  let { data, onPostClashesPress, challengeClash, hrLine, onReportPress } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;

  const { showBottomSheet: showReportSheet } = useContext(
    FlagReportSheetContext
  );

  const clashApi = new ClashApi();

  let localmedia =
    data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null;

  const handleReaction = async (type) => {
    let likes = data?.likes?.filter((e) => e != currentUser?._id);
    let dislikes = data?.dislikes?.filter((e) => e != currentUser?._id);
    if (type == "like") {
      likes.push(currentUser?._id);
    } else {
      dislikes.push(currentUser?._id);
    }

    await clashApi.updateClashById(data?._id, {
      likes,
      dislikes,
    });
  };

  const onAudioPlay = async () => {
    let audio_views = [...data?.listened];
    if (audio_views?.includes(currentUser?._id)) return;
    audio_views.push(currentUser?._id);
    await clashApi.updateClashById(data?._id, { listened: audio_views });
  };

  let userMention =
    data?.clashTo != "post" ? data?.clashTo?.author?.username : null;

  return (
    <View style={styles.container}>
      {!data && <Instagram />}
      {hrLine && <View style={styles.hrLine}></View>}
      <View style={styles.content}>
        <Header author={data?.author || {}} createdAt={data?.createdAt} />
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
            onReportPress={() => showReportSheet(data)}
            handleReaction={handleReaction}
          />
        </View>
      </View>
    </View>
  );
};

export default ClashCard;
