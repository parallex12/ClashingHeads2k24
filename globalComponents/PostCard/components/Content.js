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
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import WaveAudioPlayer from "../../WaveAudioPlayer";
import { useNavigation } from "@react-navigation/native";

const Content = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const PostImage = ({ url, onPress }) => {
    return (
      <TouchableWithoutFeedback
        style={styles.postImageWrapper}
        onPress={onPress}
      >
        <Image
          source={{ uri: url }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container} activeOpacity={1}>
      <Text style={styles.title}>
        Should we eliminate taxes for the wealthy people?
      </Text>
      <PostImage
        url={
          "https://t3.ftcdn.net/jpg/03/79/17/00/360_F_379170051_7No0Yg8z2uxbyby4Y0WFDNCBZo18tNGr.jpg"
        }
        onPress={() => alert("Home")}
      />
      <WaveAudioPlayer source="https://firebasestorage.googleapis.com/v0/b/clashing-head-ae0e6.appspot.com/o/debates%2FWas%20Silicon%20Valley%20Bank%E2%80%99s%20collapse%20really%20due%20to%20their%20policy%20of%20diversity%3F%2Fopinions%2FfusmPXq0kaXLBj6MR0q87Kwz8KE21.mp4?alt=media&token=e0ba6205-5933-4632-b9f1-6d09445482e2" />
      <Text style={styles.smallText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </Text>
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(5, height),
      justifyContent: "space-around",
      marginVertical: getPercent(1, height),
    },
    title: font(14, "#1C1C1C", "Medium", 5),
    postImageWrapper: {
      width: "100%",
      height: getPercent(15, height),
      borderRadius: 10,
      overflow: "hidden",
      marginVertical: getPercent(1, height),
      position: "relative",
      zIndex: 2,
    },
    smallText: font(12, "#111827", "Regular", 10),
  });

export default Content;
