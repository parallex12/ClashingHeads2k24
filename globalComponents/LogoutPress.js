import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LogoutPressStyles, font } from "../styles/Global/main";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useRecoilState, useResetRecoilState } from "recoil";
import { user_auth, user_db_details } from "../state-management/atoms/atoms";

const LogoutPress = (props) => {
  let navigation = useNavigation();
  const reset_userAuth = useResetRecoilState(user_auth);
  const reset_userDetails= useResetRecoilState(user_db_details);

  const onLogout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    auth()
      .signOut()
      .then(() => {
        reset_userAuth();
        reset_userDetails();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <Pressable onPress={onLogout} style={props?.style}>{props?.children}</Pressable>;
};

export default LogoutPress;
