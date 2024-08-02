import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { standardButtonStyles } from "../styles/Global/main";
const StandardButton = (props) => {
  let { customStyles,loading, rightIcon, textStyles, onPress, title } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = standardButtonStyles({ width, height });

  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {title &&<Text style={[styles.text, textStyles]}>{title}</Text>}
          {rightIcon && rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default StandardButton;
