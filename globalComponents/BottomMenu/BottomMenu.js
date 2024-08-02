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
  isBottomSheetOpen,
  isSideMenuOpen,
} from "../../state-management/features/bottom_menu";
import { onMenuPress } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useBottomSheet } from "@gorhom/bottom-sheet";

let navArr = [
  {
    title: "Home",
    icon: require("../../assets/BottomMenuIcons/home.png"),
    activeIcon: require("../../assets/BottomMenuIcons/homeActive.png"),
    route: "Home",
  },

  {
    title: "News",
    icon: require("../../assets/BottomMenuIcons/news.png"),
    activeIcon: require("../../assets/BottomMenuIcons/newsActive.png"),
    route: "News",
  },
  {
    title: "Create",
    icon: require("../../assets/BottomMenuIcons/plusIcon.png"),
    activeIcon: require("../../assets/BottomMenuIcons/plusIconactive.png"),
    route: "AddPostDetails",
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
  const _isBottomSheetOpen = useSelector(isBottomSheetOpen);
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
    "Connections",
    "CalendarScreen",
    "NewPost",
  ];
  const currentRouteName = _currentActiveScreen;
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

  if (
    _isSideMenuOpen == "open" ||
    !allowedScreens?.includes(currentRouteName) ||
    _isBottomSheetOpen === 1
  )
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
