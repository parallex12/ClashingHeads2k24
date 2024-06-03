import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { standardButtonStyles } from "../styles/Global/main";
const StandardButton = (props) => {
  let { customStyles, disable, rightIcon, textStyles, onPress, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = standardButtonStyles({ width, height });

  return (
    <>
      {
        disable ?
          <View></View>
          : <TouchableOpacity
            style={[styles.container, customStyles]}
            onPress={onPress}
          >
            <Text style={[styles.text, textStyles]}>{title}</Text>
            {rightIcon && rightIcon}
          </TouchableOpacity>
      }
    </>
  );
};

export default StandardButton;
