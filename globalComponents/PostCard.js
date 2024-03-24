import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { PostCardStyles, font } from "../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Profile from "./StandardHeader/components/Profile";

const PostCard = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = PostCardStyles({ width, height });
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
};

export default PostCard;
