import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { checkUserOnlineStatus, getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { getTimeElapsed } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import ActivityStatus from "../../ActivityStatus";
import FastImage from "react-native-fast-image";
import { rms, rs } from "../../../utils/responsiveSizing";
import useUserProfile from "../../../Hooks/useUserProfile";

const Profile = ({ source, profileStyles, user }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.profileCont}>
      <View style={styles.profileWrapper}>
        <FastImage
          source={{ ...source, priority: FastImage.priority.normal }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          defaultSource={require("../../../assets/icon.png")}
        />
      </View>
      <ActivityStatus user={user} />
    </View>
  );
};

const Header = (props) => {
  let { author, createdAt, profileStyles, onPostActions } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let post_past_time = getTimeElapsed(createdAt);
  const navigation = useNavigation();
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
        }}
        onPress={() => {
          if (author?._id == currentUser?._id) {
            navigation?.navigate("MyProfile");
          } else {
            navigation?.navigate("UserProfile", {
              user: author,
            });
          }
        }}
      >
        <Profile
          source={{
            uri: author?.profile_photo,
          }}
          user={author}
          profileStyles={profileStyles}
        />
        <View style={styles.infoWrapper}>
          <View style={styles.infoTitleRow}>
            <Text style={styles.titleName}>{author?.realName}</Text>
            {author?.verified && (
              <Image
                source={require("../../../assets/icons/mStarIcon.png")}
                resizeMode="contain"
                style={{
                  width: getPercent(2, height),
                  height: getPercent(2, height),
                }}
              />
            )}
          </View>
          <Text style={styles.slugText} numberOfLines={1}>
            {author?.politics} - {post_past_time}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.settingsIconWrapper}>
        <TouchableOpacity style={styles.settingsIcon} onPress={onPostActions}>
          <Entypo name="dots-three-horizontal" size={20} color="#7A8085" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    profileWrapper: {
      width: rs(32),
      height: rs(32),
      borderRadius: 100,
      zIndex: 1,
      borderWidth: 1,
      overflow:'hidden',
      backgroundColor: "#fff",
      borderColor:"#e1e1e1"
    },
    profileCont:{
    },
    infoWrapper: {
      flex: 1,
      paddingHorizontal: rs(10),
    },
    infoTitleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleName: {
      fontSize: rms(14),
      color: "#111827",
      fontFamily: "Medium",
    },
    slugText: {
      fontSize: rms(12),
      color: "#6B7280",
      fontFamily: "Regular",
    },
    settingsIconWrapper: {
      alignItems: "flex-end",
    },
    settingsIcon: {
      padding: 5,
    },
  });

export default Header;
