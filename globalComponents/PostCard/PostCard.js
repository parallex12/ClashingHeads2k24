import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { PostCardStyles, font } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { memo, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";
import { useRecoilValue } from "recoil";
import { user_db_details } from "../../state-management/atoms/atoms";
import { update_post, update_post_reaction, update_post_reaction_locally } from "../../middleware/firebase";
import { handleReaction } from "../../utils";

const PostCard = (props) => {
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
  const createdAtDate = new Date(data?.createdAt?.seconds * 1000 + data?.createdAt?.nanoseconds / 1000000).toUTCString()
  const user_details = props?.user_db_details

  const onReaction = (type) => {
    update_post_reaction(data?.id, user_details?.id, type)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
  };



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
        <Header author={data?.author} createdAt={data?.createdAt} onProfilePress={onProfilePress} />
        <Content {...data} desc_limit={desc_limit} />
        <ActionMenu
          {...data}
          postClashes={postClashes}
          onReportPress={onReportPress}
          onPostClashesPress={() => navigation?.navigate("ClashDetails", data)}
          onReaction={onReaction}
        />
      </View>
      {postDateAndViews && (
        <View style={styles.postDateAndViews}>
          <Text style={font(10, "#9CA3AF", "Regular")}>
            Posted on {createdAtDate}
          </Text>
          <Text style={font(10, "#111827", "Bold")}>
            {data?.views_count || 0} <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  user_db_details: state.main.user_db_details
});
export default connect(mapStateToProps, {})(PostCard);
