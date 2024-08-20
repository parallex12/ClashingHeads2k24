import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CacheImage from "../../CacheImage";
import ActivityStatus from "../../ActivityStatus";
import { useQueryClient } from "react-query";

const Profile = (props) => {
  let { data, source, menu, profile_hash, customStyles } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;

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
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onMenu}>
      <View style={[styles.profileWrapper, customStyles]}>
        <CacheImage
          source={profileImg}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          hash={profile_hash}
        />
      </View>
      {menu && (
        <View style={styles.menu}>
          <Entypo name="menu" size={getPercent(1.8, height)} color="#DB2727" />
        </View>
      )}
      <ActivityStatus user={data}/>
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
