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

const Content = (props) => {
  let { postDesc, title, postMedia } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  const PostImage = ({ url, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.postImageWrapper}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} activeOpacity={1}>
      {title && <Text style={styles.title}>{title}</Text>}
      {postMedia?.images?.length > 0 && (
        <PostImage url={postMedia?.images[0]} onPress={() => alert("Home")} />
      )}
      {postMedia?.audio && <WaveAudioPlayer source={postMedia?.audio} />}
      {postDesc && <Text style={styles.smallText}>{postDesc}</Text>}
    </View>
  );
};

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
      height: getPercent(15, height),
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
