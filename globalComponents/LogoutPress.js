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
import { connect, useDispatch } from "react-redux";
import {
  RESET,
  USER_AUTH,
  USER_DB_DETAILS,
} from "../state-management/types/types";
import { logout } from "../state-management/features/auth/authSlice";
import store from "../state-management/store/store";

const LogoutPress = (props) => {
  let navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    await auth()
      .signOut()
      .then((res) => {
        dispatch(logout());
      })
      .catch((e) => {
        console.log(e);
        dispatch(logout());
      });
  };

  return (
    <Pressable onPress={onLogout} style={props?.style}>
      {props?.children}
    </Pressable>
  );
};

export default LogoutPress;
