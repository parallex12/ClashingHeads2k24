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
import { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ActionMenu from "./components/ActionMenu";

const PostCard = (props) => {
  let {
    data,
    onPostClashesPress,
    postClashes,
    divider,
    postDateAndViews,
    onReportPress,
    onProfilePress
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();

  return (
    <Pressable
      style={[
        styles.container,
        {
          borderBottomWidth: divider ? 10 : 0,
        },
      ]}
      onPress={() => navigation?.navigate("ClashDetails", { data })}
    >
      <View style={styles.content}>
        <Header author={data?.author} onProfilePress={onProfilePress} />
        <Content {...data} />
        <ActionMenu
          {...data}
          postClashes={postClashes}
          onPostClashesPress={onPostClashesPress}
          onReportPress={onReportPress}
        />
      </View>
      {postDateAndViews && (
        <View style={styles.postDateAndViews}>
          <Text style={font(10, "#9CA3AF", "Regular")}>
            Posted on Tue 9 Jan 8:35 AM
          </Text>
          <Text style={font(10, "#111827", "Bold")}>
            23k <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default PostCard;
