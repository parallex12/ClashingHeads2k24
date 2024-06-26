import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { Entypo } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Profile = (props) => {
  let { source } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  let dummyImg = {
    uri: "https://dentalia.orionthemes.com/demo-1/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750.jpg",
  };

  const onMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity style={styles.container}  onPress={onMenu}>
      <View style={styles.profileWrapper}>
        <Image
          source={source || dummyImg}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.menu} >
        <Entypo name="menu" size={getPercent(1.8, height)} color="#DB2727" />
      </View>
    </TouchableOpacity>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(5.4, height),
      position: "relative",
    },
    profileWrapper: {
      width: getPercent(5.4, height),
      height: getPercent(5.4, height),
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 1,
    },
    menu: {
      width: getPercent(2.7, height),
      height: getPercent(2.7, height),
      borderRadius: 100,
      borderWidth: 1,
      position: "absolute",
      bottom: -7,
      right: -7,
      backgroundColor: "#ffffff",
      borderColor: "#DB2727",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
  });

export default Profile;
