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
import { Blurhash } from "react-native-blurhash";

const Content = memo((props) => {
  let {
    description,
    onAudioPlay,
    noaudioreset,
    desc_limit,
    title,
    post_image,
    sticker,
    recording,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  const PostImage = ({ source, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.postImageWrapper}
        onPress={() => blurhash()}
        activeOpacity={0.9}
      >
        <Blurhash
          blurhash="LFF$35?DERn#4,E4RPxYxv?GM|E2"
          style={{ width: "100%", height: "100%" }}
        />
        {/* <Image
          source={source}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        /> */}
      </TouchableOpacity>
    );
  };

  const blurhash = async () => {
    console.log(await Blurhash.encode(post_image, 4, 3));
  };
  return (
    <View style={styles.container} activeOpacity={1}>
      {title && <Text style={styles.title}>{title}</Text>}
      {post_image && <PostImage source={{ uri: post_image }} />}
      {sticker && <PostImage source={sticker?.img} />}
      {recording && (
        <WaveAudioPlayer afterAudioPlayed={onAudioPlay} source={recording} />
      )}
      {sticker && (
        <WaveAudioPlayer
          afterAudioPlayed={onAudioPlay}
          localSource={sticker?.audio}
        />
      )}
      {description && (
        <Text numberOfLines={desc_limit} style={styles.smallText}>
          {description}
        </Text>
      )}
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
