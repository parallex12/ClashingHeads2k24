import {
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { StandardSwitchStyles } from "../styles/Global/main";
import { useState } from "react";

const StandardSwitch = (props) => {
  let { customStyles, is_enabled, textStyles, onPress, title, toggle_Switch } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = StandardSwitchStyles({ width, height });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Switch
      trackColor={{ false: "#F3F4F6", true: "#DB2727" }}
      thumbColor={isEnabled ? "#fff" : "#F3F4F6"}
      ios_backgroundColor="#F3F4F6"
      onValueChange={toggle_Switch || toggleSwitch}
      value={is_enabled || isEnabled}
      style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }} // Adjust size here
    />
  );
};

export default StandardSwitch;
