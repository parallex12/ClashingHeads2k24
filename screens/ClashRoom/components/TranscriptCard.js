import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TranscriptCardStyles as _styles } from "../../../styles/ClashRoom/main";
import { font } from "../../../styles/Global/main";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import { getPercent } from "../../../middleware";

const TranscriptCard = (props) => {
  let { data, index } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require("../../../assets/dummy/dummyProfile2.png")}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
      <Text style={font(12, "#000000", "Bold", 3, null, { marginLeft: 10 })}>
        Username
      </Text>
        <Text
          style={font(12, "#000000", "Regular", 3, null, styles.transcriptText)}
        >
          This is demo text for transcript This is demo text for transcript This
          is demo text for transcriptThis is demo text for transcript This is
          demo text for transcript This is demo text for transcriptThis is demo
          text for transcript This is demo text for transcript This is demo text
          for transcriptThis is demo text for transcript This is demo text for
          transcript This is demo text for transcriptThis is demo text for
          transcript This is demo text for transcript This is demo text for
          transcript
        </Text>
      </View>
    </View>
  );
};

export default TranscriptCard;
