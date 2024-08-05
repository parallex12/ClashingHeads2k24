import { View, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClashCardStyles } from "../../styles/Global/main";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { stickerArr } from "../../utils";
import { Instagram } from "react-content-loader/native";
import { selectAuthUser } from "../../state-management/features/auth";
import { update_clash_by_id } from "../../state-management/apiCalls/clash";

const ClashCard = (props) => {
  let { data, onPostClashesPress, challengeClash, hrLine, onReportPress } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  const { _id } = useSelector(selectAuthUser);
  const [singleUser, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  let localmedia =
    data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null;

  useEffect(() => {
    (async () => {
      setAuthor(data?.author);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })();
  }, [data]);

  const handleReaction = async (type) => {
    let likes = data?.likes?.filter((e) => e != _id);
    let dislikes = data?.dislikes?.filter((e) => e != _id);
    if (type == "like") {
      likes.push(_id);
    } else {
      dislikes.push(_id);
    }

    await update_clash_by_id(data?._id, {
      likes,
      dislikes,
    });
  };

  const onAudioPlay = async () => {
    let audio_views = [...data?.listened];
    if (audio_views?.includes(_id)) return;
    audio_views.push(_id);
    await update_clash_by_id(data?._id, { listened: audio_views });
  };

  let userMention =
    data?.clashTo != "post" ? data?.clashTo?.author?.username : null;

  if (!data || loading) {
    return <Instagram />;
  }

  return (
    <View style={styles.container}>
      {!data || (loading && <Instagram />)}
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
