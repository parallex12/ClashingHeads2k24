import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { PostCardStyles, font } from "../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { memo, useMemo } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import PostApi from "../../ApisManager/PostApi";
import { useQueryClient } from "react-query";

const PostCard = memo((props) => {
  let {
    data,
    onPostClashesPress,
    desc_limit,
    divider,
    postDateAndViews,
    onReportPress,
    views,
    onActionsPress,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();
  const createdAtDate = new Date(data?.createdAt).toDateString();
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const _id = userDataCached?.user?._id
  const memoizedData = useMemo(() => data, [data]);
  const postApi = new PostApi();

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
  };

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
            onPostActions={onActionsPress}
          />
          <Content {...memoizedData} desc_limit={desc_limit} />
          <ActionMenu
            {...memoizedData}
            onReportPress={onReportPress}
            onPostClashesPress={onPostClashesPress}
            onReaction={onReaction}
          />
        </View>
        {postDateAndViews && (
          <View style={styles.postDateAndViews}>
            <Text style={font(13, "#9CA3AF", "Regular")}>
              Posted on {createdAtDate}
            </Text>
            <Text style={font(13, "#111827", "Bold")}>
              {views || 0}{" "}
              <Text style={font(13, "#9CA3AF", "Regular")}>Views</Text>
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
});

export default PostCard;
