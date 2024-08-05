import { Text, View, useWindowDimensions } from "react-native";
import { EmptyBoxStyles } from "../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const EmptyBox = (props) => {
  let { text, icon } = props;
  let { width, height } = useWindowDimensions();
  let styles = EmptyBoxStyles({ width, height });

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
