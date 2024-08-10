import { ImageBackground, Text, View, useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { StandardHeaderStyles } from "../../styles/Global/main";
import Profile from "./components/Profile";
import SearchIcon from "./components/SearchIcon";
import Logo from "./components/Logo";
import BackButton from "../BackButton";
import { selectAuthUser } from "../../state-management/features/auth";
import { StatusBar } from "expo-status-bar";

const StandardHeader = (props) => {
  let {
    containerStyles,
    rightIcon,
    backButton,
    searchIcon,
    title,
    profile,
    logo,
    plainBg,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = StandardHeaderStyles({ width, height });
  const user_profile = useSelector(selectAuthUser);


  return (
    <ImageBackground
      style={[
        styles.container,
        containerStyles,
        { backgroundColor: plainBg ? plainBg : "transparent" },
      ]}
      source={require("../../assets/images/headerBg.png")}
      resizeMode="stretch"
    >
      <StatusBar style="light" />
      <View style={styles.col1}>
        {profile && (
          <Profile
            source={user_profile?.profile_photo}
            profile_hash={user_profile?.profile_hash}
            data={user_profile}
          />
        )}
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
