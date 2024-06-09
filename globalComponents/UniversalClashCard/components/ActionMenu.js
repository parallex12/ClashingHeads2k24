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

const ActionMenu = (props) => {
  let {
    clashes,
    handleReaction,
    onPostClashesPress,
    onReportPress,
    dislikes,
    likes,
    reactions,
    listened,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const [activeReaction, setActiveReaction] = useState({});

  useEffect(() => {
    if (!reactions) return;
    setActiveReaction({ old: reactions[auth().currentUser?.uid] });
  }, [reactions]);

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
    let c_reaction = activeReaction?.old || activeReaction?.new;
    if (c_reaction == type) {
      setActiveReaction({ new: null });
      handleReaction(type);
    } else {
      setActiveReaction({ new: type });
      handleReaction(type);
    }
    delete activeReaction["old"];
  };

  let isLiked = activeReaction?.new == "like" || activeReaction?.old == "like";
  let isDisLiked =
    activeReaction?.new == "dislike" || activeReaction?.old == "dislike";
  let listenedViews = Object.keys(listened || {}).length;
  let actions = [
    {
      title: likes,
      iconImg: isLiked
        ? require("../../../assets/icons/post_cards/like_active.png")
        : require("../../../assets/icons/post_cards/like.png"),
      onPress: () => onReact("like"),
    },
    {
      title: dislikes,
      iconImg: isDisLiked
        ? require("../../../assets/icons/post_cards/dislike_active.png")
        : require("../../../assets/icons/post_cards/dislike.png"),
      onPress: () => onReact("dislike"),
    },
    {
      title: clashes,
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
