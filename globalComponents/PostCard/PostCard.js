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
import {
  actionsSheetRef,
  selectPosts,
} from "../../state-management/features/posts";
import { selectFetchedSingeUser } from "../../state-management/features/searchedUsers";
import {
  fetchInstantUserById,
  fetchUserById,
} from "../../state-management/features/searchedUsers/searchedUsersSlice";
import { Instagram } from "react-content-loader/native";
import ImageViewer from "../ImageViewer/ImageViewer";

const PostCard = memo((props) => {
  let {
    data,
    onPostClashesPress,
    desc_limit,
    postClashes,
    divider,
    postDateAndViews,
    onReportPress,
    views,
    loadedData,
    onActionsPress,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();
  const createdAtDate = new Date(data?.createdAt).toDateString();
  const user_details = useSelector(selectAuthUser);
  const [singleUser, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const memoizedData = useMemo(() => data, [data]);
  const dispatch = useDispatch();
  

  useEffect(() => {
    (async () => {
      let author_data = await fetchInstantUserById(data?.author);
      setAuthor(author_data);
      setLoading(false);
    })();
  }, [data]);

  const onReaction = useCallback(
    (type) => {
      update_post_reaction(data?.id, user_details?.id, type)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    [data, user_details]
  );

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
            author={singleUser || {}}
            createdAt={memoizedData?.createdAt}
            onPostActions={onActionsPress}
          />
          <Content
            loadedData={loadedData}
            {...memoizedData}
            desc_limit={desc_limit}
          />
          <ActionMenu
            {...memoizedData}
            postClashes={postClashes}
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
