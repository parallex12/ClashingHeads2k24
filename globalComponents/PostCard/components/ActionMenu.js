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
import { useEffect, useState } from "react";
import { onShareApp } from "../../../utils";
import { useQueryClient } from "react-query";
import { useAssets } from "expo-asset";
import FastImage from "react-native-fast-image";

const FooterItem = ({ item }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  return (
    <TouchableOpacity
      style={styles.FooterItem}
      onPress={() => item?.onPress(item)}
    >
      <View style={styles.iconImage}>
        <FastImage
          source={item?.iconImg}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.actionText}>
        {item?.title == "Clashes" ? "Reply Clash" : item?.title}
      </Text>
    </TouchableOpacity>
  );
};

const ActionMenu = (props) => {
  let { onReaction, onPostClashesPress, onReportPress, dislikes, likes } =
    props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const _id = userDataCached?.user?._id;
  let assets = [
    require("../../../assets/icons/post_cards/like_active.png"),
    require("../../../assets/icons/post_cards/like.png"),
    require("../../../assets/icons/post_cards/dislike_active.png"),
    require("../../../assets/icons/post_cards/dislike.png"),
    require("../../../assets/icons/post_cards/sound.png"),
    require("../../../assets/icons/post_cards/flag.png"),
    require("../../../assets/icons/post_cards/share.png"),
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
      title: reactions?.likes?.length,
      iconImg: isLiked ? assets && assets[0] : assets && assets[1],
      onPress: () => onReact("like"),
    },
    {
      title: reactions?.dislikes?.length,
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
      minHeight: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      paddingBottom: 5,
    },
    FooterItem: {
      height: getPercent(4, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    iconImage: {
      width: getPercent(5, width),
      height: getPercent(5, height),
    },
    actionText: font(15, "#6B7280", "Medium", 0, null, { marginLeft: 5 }),
  });

export default ActionMenu;
