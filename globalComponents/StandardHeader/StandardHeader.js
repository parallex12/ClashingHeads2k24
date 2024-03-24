import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { StandardHeaderStyles } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Profile from "./components/Profile";
import SearchIcon from "./components/SearchIcon";
import Logo from "./components/Logo";

const StandardHeader = (props) => {
  let { customStyles, color, textStyles, title } = props;
  let { width, height } = useWindowDimensions();
  let styles = StandardHeaderStyles({ width, height });
  let navigation = useNavigation();

  const onBack = () => {
    navigation?.goBack();
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/headerBg.png")}
      resizeMode="cover"
    >
      <Profile />
      <Logo />
      <SearchIcon />
    </ImageBackground>
  );
};

export default StandardHeader;
