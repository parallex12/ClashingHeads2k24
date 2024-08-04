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
import { Blurhash } from "react-native-blurhash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";

const Profile = (props) => {
  let { data, source, menu, profile_hash, customStyles } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();
  const [imageLoad, setImageLoad] = useState(true);
  const currentUser = useSelector(selectAuthUser);
  let userId = data?._id;
  let profileImg = {
    uri: source,
  };

  const onMenu = () => {
    if (userId == currentUser?._id) {
      navigation?.navigate("MyProfile");
    } else {
      navigation?.navigate("UserProfile", {
        user: data,
      });
    }
    // navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onMenu}>
      <View style={[styles.profileWrapper, customStyles]}>
        {imageLoad && profile_hash && (
          <Blurhash
            blurhash={profile_hash}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 999,
            }}
          />
        )}
        <Image
          source={source ? profileImg : require("../../../assets/icons/42.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          onLoad={() => setImageLoad(false)}
        />
      </View>
      {menu && (
        <View style={styles.menu}>
          <Entypo name="menu" size={getPercent(1.8, height)} color="#DB2727" />
        </View>
      )}
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
