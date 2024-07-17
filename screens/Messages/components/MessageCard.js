import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { formatTime, getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchInstantUserById } from "../../../state-management/features/searchedUsers/searchedUsersSlice";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { Facebook, Instagram } from "react-content-loader/native";

const MessageCard = (props) => {
  let { data, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?.id;
  let userId = data?.participants?.filter((e) => e != currentUserId)[0];

  useEffect(() => {
    (async () => {
      if (!data) return;
      let author_data = await fetchInstantUserById(userId);
      setSingleUser(author_data);
      setLoading(false);
    })();
  }, [data]);

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
        {singleUser?.status == "online" && <View style={styles.online}></View>}
      </View>
    );
  };

  const onCardPress = () => {
    navigation.navigate("ChatScreen", {
      userId: userId,
      otherUserData: singleUser,
    });
  };

  if (loading) {
    return <Facebook />;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onCardPress}
    >
      <Profile
        source={{
          uri:
            singleUser?.profile_photo ||
            "https://dentalia.orionthemes.com/demo-1/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750.jpg",
        }}
      />
      <View style={styles.infoWrapper}>
        <Text style={styles.titleName}>{singleUser.realName}</Text>
        <Text style={styles.slugText}>{data?.lastMessage?.text}</Text>
      </View>
      <View style={styles.rightActions}>
        <Text style={styles.timeText}>
          {formatTime(data?.lastMessage?.createdAt)}
        </Text>
        <View style={styles.counterWrapper}>
          <Text style={styles.counterText}>50</Text>
        </View>
      </View>
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
    titleName: font(14, "#111827", "Medium", 5, null, { marginRight: 10 }),
    slugText: font(12, "#111827", "Regular", 3),
    rightActions: {
      flex: 0.3,
      height: getPercent(6, height),
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingVertical: 1,
    },
    timeText: font(11, "#6B7280", "Regular", 0),
    counterWrapper: {
      minWidth: getPercent(5, width),
      minHeight: getPercent(5, width),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      padding: 4,
      alignItems: "center",
      justifyContent: "center",
    },
    counterText: font(10, "#FFFFFF", "Medium"),
  });

export default MessageCard;
