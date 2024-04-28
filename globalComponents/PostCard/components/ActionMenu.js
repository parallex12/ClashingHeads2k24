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
import FlagReportBottomSheet from "../../FlagReportBottomSheet/FlagReportBottomSheet";
import { useRef } from "react";
import { onShareApp } from "../../../utils";

const ActionMenu = (props) => {
  let { postClashes, onPostClashesPress, onReportPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const bottomFlagSheetRef = useRef(null);

  const FooterItem = ({ item, index, post_clashes_count }) => {
    return (
      <TouchableOpacity
        style={styles.FooterItem}
        onPress={() => item?.onPress(item, post_clashes_count)}
      >
        <View style={styles.iconImage}>
          <Image
            source={item?.iconImg}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.actionText}>
          {post_clashes_count || item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  let actions = [
    {
      title: "100",
      iconImg: require("../../../assets/icons/post_cards/like.png"),
      onPress: () => null,
    },
    {
      title: "210",
      iconImg: require("../../../assets/icons/post_cards/dislike.png"),
      onPress: () => null,
    },
    {
      title: "Clashes",
      iconImg: require("../../../assets/icons/post_cards/sound.png"),
      onPress: (item, post_clashes_count) =>
        post_clashes_count
          ? onPostClashesPress()
          : navigation?.navigate("ClashDetails"),
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
        let post_clashes_count = item?.title == "Clashes" ? postClashes : null;
        return (
          <FooterItem
            index={index}
            item={item}
            key={index}
            post_clashes_count={post_clashes_count}
          />
        );
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
    actionText: font(12, "#6B7280", "Medium", 0, 0, { marginLeft: 5 }),
  });

export default ActionMenu;
