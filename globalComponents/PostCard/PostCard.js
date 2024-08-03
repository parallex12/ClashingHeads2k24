import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { PostCardStyles, font } from "../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { memo, useMemo } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { selectAuthUser } from "../../state-management/features/auth";
import { update_post_by_id } from "../../state-management/apiCalls/post";

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
  const { author } = data;
  const createdAtDate = new Date(data?.createdAt).toDateString();
  const { _id } = useSelector(selectAuthUser);
  const { clashes } = data;
  const memoizedData = useMemo(() => data, [data]);

  const onReaction = async (type) => {
    let likes = data?.likes?.filter((e) => e != _id);
    let dislikes = data?.dislikes?.filter((e) => e != _id);
    if (type == "like") {
      likes.push(_id);
    } else {
      dislikes.push(_id);
    }

    await update_post_by_id(data?._id, {
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
            borderTopWidth: divider ? 10 : 0,
          },
        ]}
        onPress={() => navigation?.navigate("ClashDetails", data)}
      >
        <View style={styles.content}>
          <Header
            author={author || {}}
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
            <Text style={font(10, "#9CA3AF", "Regular")}>
              Posted on {createdAtDate}
            </Text>
            <Text style={font(10, "#111827", "Bold")}>
              {views || 0}{" "}
              <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
            </Text>
          </View>
        )}
      </Pressable>
    </>
  );
});

export default PostCard;
