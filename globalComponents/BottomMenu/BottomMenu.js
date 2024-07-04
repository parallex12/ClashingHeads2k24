import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { BottomMenuStyles, font } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  DrawerActions,
  useNavigation,
  useNavigationState,
  useRoute,
  DrawerRouter,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  activeMenuItem,
  currentActiveScreen,
  isSideMenuOpen,
} from "../../state-management/features/bottom_menu";
import { onMenuPress } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { useDrawerStatus } from "@react-navigation/drawer";

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
    title: "Menu",
    icon: require("../../assets/BottomMenuIcons/menuIcon.png"),
    activeIcon: require("../../assets/BottomMenuIcons/menuIconActive.png"),
    route: "menu",
  },
];

const BottomMenu = (props) => {
  let { active } = props;
  let { width, height } = useWindowDimensions();
  let styles = BottomMenuStyles({ width, height });
  const activeMenu = useSelector(activeMenuItem);
  const _isSideMenuOpen = useSelector(isSideMenuOpen);
  const _currentActiveScreen = useSelector(currentActiveScreen);
  const dispatch = useDispatch();
  let navigation = useNavigation();
  const allowedScreens = [
    "Home",
    "Clashes",
    "ClashDetails",
    "UserProfile",
    "News",
    "Messages",
    "MyProfile",
    "Connections"
  ];
  const currentRouteName = _currentActiveScreen;
  console.log(currentRouteName);
  const onPressItem = (item) => {
    if (item?.route == "menu") {
      navigation.dispatch(DrawerActions.openDrawer());
      dispatch(onMenuPress(null));
    } else {
      dispatch(onMenuPress(item.route));
      navigation.navigate(item.route); // Navigate to the specified route
    }
  };

  const BottomMenuItem = ({ item, index }) => {
    let isActiveItem = currentRouteName == item?.route;
    let shouldActiveMenuIcon =
      !navArr?.filter((e) => e?.route == currentRouteName)?.length > 0 &&
      allowedScreens?.includes(currentRouteName) &&
      item?.route == "Home";

    return (
      <TouchableOpacity
        style={styles.bottomMenuItem}
        onPress={() => onPressItem(item, index)}
      >
        <View style={styles.itemIconWrapper}>
          <Image
            source={
              isActiveItem || shouldActiveMenuIcon ? item.activeIcon : item.icon
            }
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text
          style={font(
            10,
            isActiveItem || shouldActiveMenuIcon ? "#DB2727" : "#718093",
            "Regular",
            4
          )}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  if (_isSideMenuOpen == "open" || !allowedScreens?.includes(currentRouteName))
    return null;

  return (
    <View style={styles.container}>
      {navArr?.map((item, index) => {
        return <BottomMenuItem item={item} index={index} key={index} />;
      })}
    </View>
  );
};

export default BottomMenu;
