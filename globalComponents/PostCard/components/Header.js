import {
  Image,
  Pressable,
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
import { memo, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { Blurhash } from "react-native-blurhash";
import { fetchUserById } from "../../../state-management/features/searchedUsers/searchedUsersSlice";
import { selectFetchedSingeUser } from "../../../state-management/features/searchedUsers";
import ContentLoader, {
  Facebook,
  Instagram,
} from "react-content-loader/native";
import CacheImage from "../../CacheImage";

const Header = (props) => {
  let { author, createdAt, profileStyles,onPostActions } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const dispatch = useDispatch();
  let post_past_time = getTimeElapsed(createdAt);
  const navigation = useNavigation();
  const user_details = useSelector(selectAuthUser);
  let user_author = author;
  const Profile = ({ source, profileStyles }) => {
    const [imageLoad, setImageLoad] = useState(true);

    return (
      <View style={[styles.container, { ...profileStyles }]}>
        <View style={styles.profileWrapper}>
          {imageLoad && user_details?.profile_hash && (
            <Blurhash
              blurhash={user_details?.profile_hash}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 999,
              }}
            />
          )}
          <CacheImage
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setImageLoad(false)}
          />
        </View>
        {author?.status == "online" && <View style={styles.online}></View>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          flex: 1,
        }}
        onPress={() => {
          if (author?.id == user_details?.id) {
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
            uri: user_author?.profile_photo,
          }}
          profileStyles={profileStyles}
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
      <View style={styles.settingsIconWrapper}>
        <TouchableOpacity  style={styles.settingsIcon} onPress={onPostActions}>
          <Entypo name="dots-three-horizontal" size={20} color="#7A8085" />
        </TouchableOpacity>
      </View>
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
      width: getPercent(5, height),
      height: getPercent(5, height),
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
    titleName: font(14, "#111827", "Medium", 2, null, { marginRight: 10 }),
    slugText: font(12, "#6B7280", "Regular"),
    settingsIconWrapper: {
      flex: 0.8,
      alignItems: "flex-end",
    },
    settingsIcon:{
      padding:5,
    }
  });

export default Header;
