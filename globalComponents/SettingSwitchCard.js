import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SettingSwitchCardStyles, font } from "../styles/Global/main";
import StandardSwitch from "./StandardSwitch";

const SettingSwitchCard = (props) => {
  let { data,on_toggle_Switch } = props;
  let { width, height } = useWindowDimensions();
  let styles = SettingSwitchCardStyles({ width, height });


  return (
    <View style={styles.container}>
      <Text style={font(13, "#000000", "Regular", 0, null, styles.text)}>
        {data?.label}
      </Text>
      <StandardSwitch is_enabled={data?.isEnabled} toggle_Switch={on_toggle_Switch} />
    </View>
  );
};

export default SettingSwitchCard;
