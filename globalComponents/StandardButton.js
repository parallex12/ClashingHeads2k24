import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { standardButtonStyles } from "../styles/Global/main";
const StandardButton = (props) => {
  let { customStyles, textStyles, onPress, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = standardButtonStyles({ width, height });

  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(StandardButton);
