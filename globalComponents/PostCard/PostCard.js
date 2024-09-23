import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { PostCardStyles, font } from "../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { memo, useContext, useMemo } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import PostApi from "../../ApisManager/PostApi";
import FlagReportSheetContext from "../BottomSheet/FlagReportSheetProvider";
import PostActionsSheetContext from "../BottomSheet/PostActionsSheetProvider";
import NotificationsApi from "../../ApisManager/NotificationsApi";
import AntDesign from "@expo/vector-icons/AntDesign";
import { rms } from "../../utils/responsiveSizing";
import { numberWithSuffix } from "../../utils";
import useUserProfile from "../../Hooks/useUserProfile";

const PostCard = memo((props) => {
  let {
    data,
    onPostClashesPress,
    desc_limit,
    divider,
    postDateAndViews,
    views,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();
  const createdAtDate = new Date(data?.createdAt).toDateString();
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const _id = currentUser?._id;
  const memoizedData = useMemo(() => data, [data]);
  const postApi = new PostApi();
  const { sendNotification } = new NotificationsApi();
  const { showBottomSheet: showReportSheet } = useContext(
    FlagReportSheetContext
  );
  const { showBottomSheet: showActionSheet } = useContext(
    PostActionsSheetContext
  );

  const onReaction = async (type) => {
    let likes = data?.likes?.filter((e) => e != _id);
    let dislikes = data?.dislikes?.filter((e) => e != _id);
    if (type == "like") {
      likes.push(_id);
    } else {
      dislikes.push(_id);
    }

    await postApi.updatePostById(data?._id, {
      likes,
      dislikes,
    });
    if (_id != data?.author?._id) {
      let notification_details = {
        to: data?.author?._id,
        from: _id,
        type: type,
        notification_type: "post",
        about: data?._id,
      };
      await sendNotification(notification_details);
    }
  };

  let total_likes_dislikes = [...data?.likes, ...data?.dislikes]?.length;

  return (
    <>
      <Pressable
        style={[
          styles.container,
          {
            borderBottomWidth: divider ? 5 : 0,
          },
        ]}
        onPress={() => navigation?.navigate("ClashDetails", data)}
      >
        <View style={styles.content}>
          <Header
            author={data?.author || {}}
            createdAt={memoizedData?.createdAt}
            onPostActions={() => showActionSheet(data)}
          />
          <Content {...memoizedData} desc_limit={desc_limit} />
          <View style={styles.post_statics_wrapper}>
            <View style={styles.emojiWrapper}>
              <View style={styles.emojiItem}>
                <AntDesign name="dislike1" size={rms(10)} color="#fff" />
              </View>
              <View style={styles.emojiItem2}>
                <AntDesign name="like1" size={rms(10)} color="#fff" />
              </View>
              <Text style={styles.total_reactions_text}>
                {numberWithSuffix(total_likes_dislikes)}
              </Text>
            </View>
            <View style={styles.statics_text_wrapper}>
              <Text style={styles.total_reactions_text}>
                {numberWithSuffix(data?.clashes)} Clashes
              </Text>
              <Text style={styles.total_reactions_text}>.</Text>
              <Text style={styles.total_reactions_text}>
                {numberWithSuffix(data?.shares)} Shares
              </Text>
            </View>
          </View>
          <ActionMenu
            {...memoizedData}
            onReportPress={() => showReportSheet(data)}
            onPostClashesPress={onPostClashesPress}
            onReaction={onReaction}
          />
        </View>
        {postDateAndViews && (
          <View style={styles.postDateAndViews}>
            <Text style={font(12, "#9CA3AF", "Regular")}>
              Posted on {createdAtDate}
            </Text>
            <Text style={font(12, "#111827", "Bold")}>
              {views || 0}{" "}
              <Text style={font(12, "#9CA3AF", "Regular")}>Views</Text>
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
});

export default PostCard;
