import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { PostCardStyles, font } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { memo, useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { useRecoilValue } from "recoil";
import { user_db_details } from "../../state-management/atoms/atoms";
import { update_post, update_post_reaction, update_post_reaction_locally } from "../../middleware/firebase";
import { handleReaction } from "../../utils";
import { selectAuthUser } from "../../state-management/features/auth";
import { selectPosts } from "../../state-management/features/posts";
import { setPosts } from "../../state-management/features/posts/postSlice";

const PostCard = memo((props) => {
  let {
    data,
    onPostClashesPress,
    desc_limit,
    postClashes,
    divider,
    postDateAndViews,
    onReportPress,
    onProfilePress
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();
  const createdAtDate = "now"
  const user_details = useSelector(selectAuthUser)
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()

  const onReaction = useCallback((type) => {
    update_post_reaction(data?.id, user_details?.id, type)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
  }, [data, user_details, dispatch]);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <Pressable
      style={[
        styles.container,
        {
          borderBottomWidth: divider ? 10 : 0,
        },
      ]}
      onPress={() => navigation?.navigate("ClashDetails", data)}
    >
      <View style={styles.content}>
        <Header author={memoizedData?.author} createdAt={memoizedData?.createdAt} onProfilePress={onProfilePress} />
        <Content {...memoizedData} desc_limit={desc_limit} />
        <ActionMenu
          {...memoizedData}
          postClashes={postClashes}
          onReportPress={onReportPress}
          onPostClashesPress={() => navigation?.navigate("ClashDetails", memoizedData)}
          onReaction={onReaction}
        />
      </View>
      {postDateAndViews && (
        <View style={styles.postDateAndViews}>
          <Text style={font(10, "#9CA3AF", "Regular")}>
            Posted on {createdAtDate}
          </Text>
          <Text style={font(10, "#111827", "Bold")}>
            {memoizedData?.views_count || 0} <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
          </Text>
        </View>
      )}
    </Pressable>
  );
});


export default PostCard
