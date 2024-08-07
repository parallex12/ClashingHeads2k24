import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { StandardHeader2Styles } from "../../styles/Global/main";
import Profile from "./components/Profile";
import SearchIcon from "./components/SearchIcon";
import Logo from "./components/Logo";
import BackButton from "../BackButton";
import { StatusBar } from "expo-status-bar";

const StandardHeader2 = (props) => {
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
  let styles = StandardHeader2Styles({ width, height });

  return (
    <View style={[styles.container, containerStyles]}>
      <StatusBar style="dark" />
      <View style={styles.col1}>
        {profile && <Profile />}
        {backButton && <BackButton color="#0D0D0D" />}
      </View>
      <View style={styles.col2}>
        {logo && <Logo />}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <View style={styles.col3}>
        {searchIcon && <SearchIcon />}
        {rightIcon && rightIcon}
      </View>
    </View>
  );
};

export default StandardHeader2;
