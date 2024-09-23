import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { useEffect, useState } from "react";
import { onShareApp } from "../../../utils";
import { useQueryClient } from "react-query";
import AntDesign from "@expo/vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import { rms, rs } from "../../../utils/responsiveSizing";
import useUserProfile from "../../../Hooks/useUserProfile";

const FooterItem = ({ item }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  return (
    <TouchableOpacity
      style={styles.FooterItem}
      onPress={() => item?.onPress(item)}
    >
      <View style={styles.iconImage}>
        {item?.iconImg?.image ? (
          <FastImage
            source={item?.iconImg?.image}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          item?.iconImg?.icon
        )}
      </View>
      <Text style={styles.actionText}>
        {/* {item?.title == "Clashes" ? "Reply Clash" : item?.title} */}
        {item?.title}
      </Text>
    </TouchableOpacity>
  );
};

const ActionMenu = (props) => {
  let { onReaction, onPostClashesPress, onReportPress, dislikes, likes } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const _id = currentUser?._id;

  let assets = [
    { icon: <AntDesign name="like1" size={rms(20)} color="#DB2727" /> },
    { icon: <AntDesign name="like2" size={rms(20)} color="#6B7280" /> },
    { icon: <AntDesign name="dislike1" size={rms(20)} color="#DB2727" /> },
    { icon: <AntDesign name="dislike2" size={rms(20)} color="#6B7280" /> },
    { image: require("../../../assets/icons/post_cards/sound.png") },
    { image: require("../../../assets/icons/post_cards/flag.png") },
    { image: require("../../../assets/icons/post_cards/share.png") },
  ];

  const [reactions, setReactions] = useState({});

  useEffect(() => {
    setReactions({ likes, dislikes });
  }, [likes, dislikes]);

  const onReact = (type) => {
    let _likes = reactions?.likes?.filter((e) => e != _id);
    let _dislikes = reactions?.dislikes?.filter((e) => e != _id);
    type == "like" ? _likes.push(_id) : _dislikes.push(_id);
    setReactions({ likes: _likes, dislikes: _dislikes });
    onReaction(type);
  };

  let isLiked = reactions?.likes?.includes(_id);
  let isDisLiked = reactions?.dislikes?.includes(_id);

  let actions = [
    {
      title: "Like",
      iconImg: isLiked ? assets && assets[0] : assets && assets[1],
      onPress: () => onReact("like"),
    },
    {
      title: "Dislike",
      iconImg: isDisLiked ? assets && assets[2] : assets && assets[3],
      onPress: () => onReact("dislike"),
    },
    {
      title: "Clashes",
      iconImg: assets && assets[4],
      onPress: onPostClashesPress,
    },
    {
      title: "Report",
      iconImg: assets && assets[5],
      onPress: () => onReportPress(),
    },
    {
      title: "Share",
      iconImg: assets && assets[6],
      onPress: () => onShareApp(),
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((item, index) => {
        return <FooterItem index={index} item={item} key={index} />;
      })}
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(6, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      paddingVertical: rms(5),
    },
    FooterItem: {
      height: getPercent(4, height),
      alignItems: "center",
      justifyContent: "center",
    },
    iconImage: {
      width: rms(20),
      height: rms(20),
    },
    actionText: {
      fontSize: rs(10),
      fontFamily: "Medium",
      color: "#6B7280",
      marginVertical: rs(2),
    },
  });

export default ActionMenu;
