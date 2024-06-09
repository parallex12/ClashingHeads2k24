import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import WaveAudioPlayer from "../../WaveAudioPlayer";
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";

const Content = memo((props) => {
  let {
    onAudioPlay,
    sticker,
    recording,
    userMention
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  const PostImage = ({ source, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.postImageWrapper}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={source}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container} activeOpacity={1}>
      {/* <Text style={font(12, "#c5c5c5", "Medium", 10)}>@{userMention}</Text> */}
      {sticker && <PostImage source={sticker?.img} />}
      {recording && <WaveAudioPlayer afterAudioPlayed={onAudioPlay} source={recording} />}
      {sticker && <WaveAudioPlayer afterAudioPlayed={onAudioPlay} localSource={sticker?.audio} />}
    </View>
  );
});

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(5, height),
      justifyContent: "space-around",
    },
    title: font(14, "#1C1C1C", "Medium", 15),
    postImageWrapper: {
      width: "100%",
      minHeight: getPercent(15, height),
      maxHeight: getPercent(25, height),
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
      marginBottom: getPercent(1, height),
    },
    smallText: font(12, "#111827", "Regular", 10),
    bgTouchable: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "red",
    },
  });

export default Content;
