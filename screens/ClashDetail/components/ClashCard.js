import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { ClashCardStyles, font } from "../../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Header from "../../../globalComponents/PostCard/components/Header";
import Content from "../../../globalComponents/PostCard/components/Content";
import ActionMenu from "./card_components/ActionMenu";
import { stickerArr } from "../../../utils";

const ClashCard = (props) => {
  let { data, onPostClashesPress, hrLine, onReportPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = ClashCardStyles({ width, height });
  let navigation = useNavigation();

  let localmedia = data?.clashType == "sticker" ? stickerArr[data?.selectedSticker] : null

  return (
    <View style={styles.container}>
      {hrLine && <View style={styles.hrLine}></View>}
      <View style={styles.content}>
        <Header author={data?.author} createdAt={data?.createdAt} />
        <View style={styles.contentCardWrapper}>
          <Content noaudioreset sticker={localmedia} {...data} postDesc={false} title={false} />
          <ActionMenu onPostClashesPress={onPostClashesPress} {...data} onReportPress={onReportPress} />
        </View>
      </View>
    </View>
  );
};

export default ClashCard;
