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
import { Entypo } from "@expo/vector-icons";
import { getTimeElapsed } from "../../../utils";
import { memo } from "react";

const Header = (props) => {
  let { author, createdAt, onProfilePress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user_author = author
  let post_past_time = getTimeElapsed(createdAt)

  const Profile = ({ source }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileWrapper} onPress={onProfilePress}>
          <Image
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
        <View style={styles.online}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Profile
        source={{
          uri: user_author?.profile_photo,
        }}
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
        <Text style={styles.slugText}>{user_author?.politics?.key} - Los Angles,CA  {post_past_time}</Text>
      </View>
      <TouchableOpacity>
        <Entypo name="dots-three-horizontal" size={20} color="#7A8085" />
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
      width: getPercent(5.4, height),
      height: getPercent(5.4, height),
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 1,
      borderWidth: 0.2,
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
      paddingHorizontal: getPercent(5, width),
    },
    infoTitleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleName: font(14, "#111827", "Medium", 2, null, { marginRight: 10 }),
    slugText: font(12, "#6B7280", "Regular"),
  });

export default Header;
