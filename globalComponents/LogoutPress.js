import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSocket } from "../state-management/apiCalls/SocketContext";
import { useAuth } from "../ContextProviders/AuthProvider";

const LogoutPress = (props) => {
  let navigation = useNavigation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { logout } = useAuth();

  const onLogout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(logout());
    // socket.disconnect();
    logout()
  };

  return (
    <Pressable onPress={onLogout} style={props?.style}>
      {props?.children}
    </Pressable>
  );
};

export default LogoutPress;
