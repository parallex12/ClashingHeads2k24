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
import { useNavigation } from "@react-navigation/native";
import { onShareApp } from "../../../utils";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { selectAuthUser } from "../../../state-management/features/auth";
import { useSelector } from "react-redux";

const ActionMenu = (props) => {
  let {
    clashes,
    handleReaction,
    onPostClashesPress,
    onReportPress,
    dislikes,
    likes,
    listened,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [reactions, setReactions] = useState({});
  const { _id } = useSelector(selectAuthUser);
  useEffect(() => {
    setReactions({ likes, dislikes });
  }, [likes, dislikes]);

  const FooterItem = ({ item, index }) => {
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
        <Text style={styles.actionText}>{item?.title}</Text>
      </TouchableOpacity>
    );
  };

  const onReact = (type) => {
    let _likes = reactions?.likes?.filter((e) => e != _id);
    let _dislikes = reactions?.dislikes?.filter((e) => e != _id);
    type == "like" ? _likes.push(_id) : _dislikes.push(_id);
    setReactions({ likes: _likes, dislikes: _dislikes });
    handleReaction(type);
  };

  let isLiked = reactions?.likes?.includes(_id);
  let isDisLiked = reactions?.dislikes?.includes(_id);
  let listenedViews = listened?.length;

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
      title: "Reply Clash",
      iconImg: require("../../../assets/icons/post_cards/sound.png"),
      onPress: () => onPostClashesPress(),
    },
    {
      title: listenedViews || 0,
      iconImg: require("../../../assets/icons/post_cards/chart.png"),
      onPress: () => null,
    },
    {
      title: "",
      iconImg: require("../../../assets/icons/post_cards/flag.png"),
      onPress: () => onReportPress(),
    },
    {
      title: "",
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
      minHeight: getPercent(3, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 5,
      paddingBottom: 5,
    },
    FooterItem: {
      height: getPercent(3, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    iconImage: {
      width: getPercent(4.2, width),
      height: getPercent(4.2, width),
    },
    actionText: font(11, "#6B7280", "Medium", 0, null, { marginLeft: 5 }),
  });

export default ActionMenu;
