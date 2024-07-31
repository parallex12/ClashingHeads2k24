import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { BackButtonStyles } from "../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const BackButton = (props) => {
  let { customStyles, color, textStyles, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = BackButtonStyles({ width, height });
  let navigation = useNavigation();

  const onPress = () => {
    navigation?.goBack(); 
  };

  if (!navigation?.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={onPress}
    >
      <Entypo
        name="chevron-thin-left"
        size={RFValue(20)}
        color={color || "#292D32"}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
