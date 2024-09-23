import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { onShareApp } from "../../../utils";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { rms, rs } from "../../../utils/responsiveSizing";
import AntDesign from "@expo/vector-icons/AntDesign";
import FastImage from "react-native-fast-image";
import useUserProfile from "../../../Hooks/useUserProfile";

const FooterItem = ({ item, index }) => {
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
      <Text style={styles.actionText}>{item?.title}</Text>
    </TouchableOpacity>
  );
};

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
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;


  useEffect(() => {
    setReactions({ likes, dislikes });
  }, [likes, dislikes]);

  const onReact = (type) => {
    const _likes = [...(reactions?.likes || [])];
    const _dislikes = [...(reactions?.dislikes || [])];

    // Determine whether to remove the reaction
    const isLike = type === "like";
    const isDislike = type === "dislike";

    if (isLike && _likes.includes(currentUser?._id)) {
      // Remove the like
      _likes.splice(_likes.indexOf(currentUser?._id), 1);
    } else if (isDislike && _dislikes.includes(currentUser?._id)) {
      // Remove the dislike
      _dislikes.splice(_dislikes.indexOf(currentUser?._id), 1);
    } else if (!_likes.includes(currentUser?._id) && !_dislikes.includes(currentUser?._id)) {
      // Add the reaction if it's not already present
      if (isLike) {
        _likes.push(currentUser?._id);
      } else if (isDislike) {
        _dislikes.push(currentUser?._id);
      }
    }

    // Update the reactions state
    setReactions({ likes: _likes, dislikes: _dislikes });

    // Handle the reaction (this function needs to be defined elsewhere)
    handleReaction(type);
  };

  let isLiked = reactions?.likes?.includes(currentUser?._id);
  let isDisLiked = reactions?.dislikes?.includes(currentUser?._id);
  let listenedViews = listened?.length;

  let actions = [
    {
      title: reactions?.likes?.length,
      iconImg: isLiked
        ? { icon: <AntDesign name="like1" size={rms(15)} color="#DB2727" /> }
        : { icon: <AntDesign name="like2" size={rms(15)} color="#6B7280" /> },
      onPress: () => onReact("like"),
    },
    {
      title: reactions?.dislikes?.length,
      iconImg: isDisLiked
        ? { icon: <AntDesign name="dislike1" size={rms(15)} color="#DB2727" /> }
        : {
            icon: <AntDesign name="dislike2" size={rms(15)} color="#6B7280" />,
          },
      onPress: () => onReact("dislike"),
    },
    {
      title: "Reply",
      iconImg: { image: require("../../../assets/icons/post_cards/sound.png") },
      onPress: () => onPostClashesPress(),
    },
    {
      title: listenedViews || 0,
      iconImg: { image: require("../../../assets/icons/post_cards/chart.png") },
      onPress: () => null,
    },
    {
      title: "Report",
      iconImg: { image: require("../../../assets/icons/post_cards/flag.png") },
      onPress: () => onReportPress(),
    },
    {
      title: "Share",
      iconImg: { image: require("../../../assets/icons/post_cards/share.png") },
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
      paddingVertical: rms(5),
    },
    FooterItem: {
      height: getPercent(3, height),
      alignItems: "center",
      justifyContent: "center",
    },
    iconImage: {
      width: getPercent(4.2, width),
      height: getPercent(4.2, width),
    },
    actionText: {
      fontSize: rms(10),
      fontFamily: "Medium",
      color: "#6B7280",
      marginVertical: rs(2),
    },
  });

export default ActionMenu;
