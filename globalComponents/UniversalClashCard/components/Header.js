import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { getTimeElapsed } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import CacheImage from "../../CacheImage";
import ActivityStatus from "../../ActivityStatus";
import { useQueryClient } from "react-query";
import FastImage from "react-native-fast-image";

const Profile = ({ source, profileStyles, author, onProfilePress }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  return (
    <View style={[styles.container, { ...profileStyles }]}>
      <TouchableOpacity style={styles.profileWrapper} onPress={onProfilePress}>
        <FastImage
          source={{ ...source, priority: FastImage.priority.normal }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
      <ActivityStatus user={author} />
    </View>
  );
};

const Header = (props) => {
  let { author, createdAt, onProfilePress, profileStyles } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user_author = author;
  let post_past_time = getTimeElapsed(createdAt);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const user_details = userDataCached?.user;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
        }}
        onPress={() => {
          if (user_author?._id == user_details?._id) {
            navigation?.navigate("MyProfile");
          } else {
            navigation?.navigate("UserProfile", {
              user: user_author,
            });
          }
        }}
      >
        <Profile
          source={{
            uri: user_author?.profile_photo,
          }}
          profileStyles={profileStyles}
          author={author}
          onProfilePress={onProfilePress}
        />
        <View style={styles.infoWrapper}>
          <View style={styles.infoTitleRow}>
            <Text style={styles.titleName}>{user_author?.realName}</Text>
            <Image
              source={require("../../../assets/icons/mStarIcon.png")}
              resizeMode="contain"
              style={{
                width: getPercent(2, height),
                height: getPercent(2, height),
              }}
            />
          </View>
          <Text style={styles.slugText}>
            {user_author?.politics} - {post_past_time}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    profileWrapper: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 1,
      borderWidth: 0.2,
      backgroundColor: "#fff",
    },
    online: {
      width: getPercent(1.5, height),
      height: getPercent(1.5, height),
      borderRadius: 100,
      borderWidth: 1,
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#6FCF97",
      borderColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },

    infoWrapper: {
      flex: 1,
      paddingHorizontal: getPercent(3, width),
    },
    infoTitleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleName: font(17, "#111827", "Medium", 2, null, { marginRight: 10 }),
    slugText: font(15, "#6B7280", "Regular"),
  });

export default Header;
