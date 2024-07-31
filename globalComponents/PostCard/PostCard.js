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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { update_post_reaction } from "../../middleware/firebase";
import { selectAuthUser } from "../../state-management/features/auth";
import { Instagram } from "react-content-loader/native";
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
  const [loading, setLoading] = useState(false);
  const memoizedData = useMemo(() => data, [data]);
  const dispatch = useDispatch();

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

  if (loading) {
    return <Instagram style={{ alignSelf: "center" }} />;
  }

  return (
    <>
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
          <Header
            author={author || {}}
            createdAt={memoizedData?.createdAt}
            onPostActions={onActionsPress}
          />
          <Content
            loadedData={data}
            {...memoizedData}
            desc_limit={desc_limit}
          />
          <ActionMenu
            {...memoizedData}
            onReportPress={onReportPress}
            onPostClashesPress={onPostClashesPress}
            onReaction={onReaction}
            postDateAndViews={postDateAndViews}
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
