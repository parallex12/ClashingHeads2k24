import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";

const Logo = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="cover"
        style={{ width: "85%", height: "85%" }}
      />
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(15, height),
      height: getPercent(8, height),
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Logo;
