import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { BottomMenuStyles, font } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

let navArr = [
  {
    title: "Home",
    icon: require("../../assets/BottomMenuIcons/home.png"),
    activeIcon: require("../../assets/BottomMenuIcons/homeActive.png"),
    route: "Home",
  },
  {
    title: "Clashes",
    icon: require("../../assets/BottomMenuIcons/clashes.png"),
    activeIcon: require("../../assets/BottomMenuIcons/clashesActive.png"),
    route: "Clashes",
  },
  {
    title: "News",
    icon: require("../../assets/BottomMenuIcons/news.png"),
    activeIcon: require("../../assets/BottomMenuIcons/newsActive.png"),
    route: "News",
  },
  {
    title: "Chat",
    icon: require("../../assets/BottomMenuIcons/chat.png"),
    activeIcon: require("../../assets/BottomMenuIcons/chatActive.png"),
    route: "Messages",
  },
  {
    title: "Notifications",
    icon: require("../../assets/BottomMenuIcons/notification.png"),
    activeIcon: require("../../assets/BottomMenuIcons/notificationActive.png"),
    route: "Notifications",
  },
];

const BottomMenu = (props) => {
  let {active} = props;
  let { width, height } = useWindowDimensions();
  let styles = BottomMenuStyles({ width, height });
  let navigation = useNavigation();
  const route = useRoute();
  // Extract the route name from the route object
  const currentRouteName = route.name;
  const onPressItem = (item) => {
    navigation.navigate(item.route); // Navigate to the specified route
  };
  
  const BottomMenuItem = ({ item, index }) => {
    let isActiveItem = currentRouteName == item?.route || active== item?.route;
    return (
      <TouchableOpacity
        style={styles.bottomMenuItem}
        onPress={() => onPressItem(item, index)}
      >
        <View style={styles.itemIconWrapper}>
          <Image
            source={isActiveItem ? item.activeIcon : item.icon}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text
          style={font(10, isActiveItem ? "#DB2727" : "#718093", "Regular", 4)}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {navArr?.map((item, index) => {
        return <BottomMenuItem item={item} index={index} key={index} />;
      })}
    </View>
  );
};

export default BottomMenu;
