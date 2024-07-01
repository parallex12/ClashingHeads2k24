import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { EmptyBoxStyles } from "../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "react-native";

const EmptyBox = (props) => {
  let { text, icon } = props;
  let { width, height } = useWindowDimensions();
  let styles = EmptyBoxStyles({ width, height });
  let navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/nocontent.png")}
        style={{ width: "100%", height: "80%" }}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyBox;
