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
import BackButton from "../BackButton";

const StandardHeader = (props) => {
  let {
    containerStyles,
    rightIcon,
    backButton,
    searchIcon,
    title,
    profile,
    logo,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = StandardHeaderStyles({ width, height });

  return (
    <ImageBackground
      style={[styles.container, containerStyles]}
      source={require("../../assets/images/headerBg.png")}
      resizeMode="cover"
    >
      <View style={styles.col1}>
        {profile && <Profile />}
        {backButton && <BackButton color="#FFFFFF" />}
      </View>
      <View style={styles.col2}>
        {logo && <Logo />}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.col3}>
        {searchIcon && <SearchIcon />}
        {rightIcon && rightIcon}
      </View>
    </ImageBackground>
  );
};

export default StandardHeader;
