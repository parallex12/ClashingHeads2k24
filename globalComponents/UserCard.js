import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { getPercent } from "../middleware";
import { font } from "../styles/Global/main";

const UserCard = (props) => {
  let { author, selectable, isSelected, onCardPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const Profile = ({ source }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.profileWrapper}>
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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onCardPress}
    >
      <Profile
        source={{
          uri: author?.profile_photo,
        }}
      />
      <View style={styles.infoWrapper}>
        <View style={styles.infoTitleRow}>
          <Text style={styles.titleName}>{author?.realName}</Text>
          <Image
            source={require("../assets/icons/mStarIcon.png")}
            resizeMode="contain"
            style={{
              width: getPercent(2, height),
              height: getPercent(2, height),
            }}
          />
        </View>
        <Text style={styles.slugText}>{author?.politics}</Text>
      </View>
      {selectable ? (
        isSelected ? (
          <Ionicons name="radio-button-on" size={24} color="#DB2727" />
        ) : (
          <Ionicons name="radio-button-off-outline" size={24} color="#E5E7EB" />
        )
      ) : (
        <Entypo name="chevron-right" size={20} color="#7A8085" />
      )}
    </TouchableOpacity>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(6, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(0.6, height),
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

export default UserCard;
