import { Switch, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { StandardSwitchStyles } from "../styles/Global/main";
import { useState } from "react";

const StandardSwitch = (props) => {
  let { customStyles, textStyles, onPress, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = StandardSwitchStyles({ width, height });
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Switch
      trackColor={{ false: "#F3F4F6", true: "#DB2727" }}
      thumbColor={isEnabled ? "#fff" : "#F3F4F6"}
      ios_backgroundColor="#F3F4F6"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default StandardSwitch;
