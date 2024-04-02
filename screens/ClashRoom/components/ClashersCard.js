import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  ClashersCardStyles as _styles,
  styles,
} from "../../../styles/ClashRoom/main";
import { font } from "../../../styles/Global/main";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";
import { getPercent } from "../../../middleware";

const ClashersCard = (props) => {
  let { data, index } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  return (
    <TouchableOpacity style={styles.container}>
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
      <Text style={font(12, "#000000", "Bold", 3)}>Username</Text>
      <View style={styles.infoWrapper}>
        {index % 2 == 0 && (
          <Image
            source={require("../../../assets/icons/soundRed.png")}
            resizeMode="contain"
            style={{
              width: getPercent(4, width),
              marginRight: 5,
              height: getPercent(4, width),
            }}
          />
        )}
        <Text style={font(11, "#9CA3AF", "Medium", 0)}>
          {index % 2 == 0 ? "Clasher" : "Host"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClashersCard;
