import {
  Image,
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
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation?.navigate("ClashDetails")}
        style={styles.bgTouchable}
      ></TouchableOpacity>
      <Header />
      <Content />
      <ActionMenu />
    </View>
  );
};

export default PostCard;
