import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../state-management/features/auth/authSlice";
import { useSocket } from "../state-management/apiCalls/SocketContext";

const LogoutPress = (props) => {
  let navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = useSocket();

  const onLogout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    await auth()
      .signOut()
      .then((res) => {
        dispatch(logout());
        socket.disconnect();
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
