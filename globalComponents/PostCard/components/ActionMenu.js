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
import {  useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";

const ActionMenu = (props) => {
  let {
    onReaction,
    onPostClashesPress,
    onReportPress,
    dislikes,
    likes,
    clashes,
    postDateAndViews,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { _id } = useSelector(selectAuthUser);

  const [reactions, setReactions] = useState({});

  useEffect(() => {
    setReactions({ likes, dislikes });
  }, [likes, dislikes]);

  const FooterItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.FooterItem}
        onPress={() => item?.onPress(item)}
      >
        <View style={styles.iconImage}>
          <Image
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
      iconImg: isLiked
        ? require("../../../assets/icons/post_cards/like_active.png")
        : require("../../../assets/icons/post_cards/like.png"),
      onPress: () => onReact("like"),
    },
    {
      title: reactions?.dislikes?.length,
      iconImg: isDisLiked
        ? require("../../../assets/icons/post_cards/dislike_active.png")
        : require("../../../assets/icons/post_cards/dislike.png"),
      onPress: () => onReact("dislike"),
    },
    {
      title: "Clashes",
      iconImg: require("../../../assets/icons/post_cards/sound.png"),
      onPress: onPostClashesPress,
    },
    {
      title: "Report",
      iconImg: require("../../../assets/icons/post_cards/flag.png"),
      onPress: () => onReportPress(),
    },
    {
      title: "Share",
      iconImg: require("../../../assets/icons/post_cards/share.png"),
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
