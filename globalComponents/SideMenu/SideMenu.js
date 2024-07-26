// SideMenu.js
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { SideMenuStyles, font } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { sideMenuOptions } from "../../middleware";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Logout } from "../../middleware/firebase";
import LogoutPress from "../LogoutPress";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  selectAuthUser,
  selectIsAuth,
} from "../../state-management/features/auth";
import { onUpdateMenu } from "../../state-management/features/bottom_menu/bottom_menuSlice";

const SideMenu = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = SideMenuStyles({ width, height });
  const dispatch = useDispatch();
  const user_details = useSelector(selectAuthUser);
  let profile = user_details?.profile_photo;
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus();

  useEffect(() => {
    dispatch(onUpdateMenu(isDrawerOpen));
  }, [isDrawerOpen]);

  const ListItem = ({ data }) => {
    if (data?.type == "logout") {
      return (
        <LogoutPress style={styles.listItem}>
          <View style={styles.listIcon}>
            <Image
              resizeMode="contain"
              source={data?.icon}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <Text style={font(12, "#FFFFFF", "Regular", 0, null, { flex: 1 })}>
            {data?.title}
          </Text>
          <Entypo name="chevron-right" size={20} color="#ffffff" />
        </LogoutPress>
      );
    }
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {
          data?.route ? navigation?.navigate(data?.route) : null;
        }}
      >
        <View style={styles.listIcon}>
          <Image
            resizeMode="contain"
            source={data?.icon}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(12, "#FFFFFF", "Regular", 0, null, { flex: 1 })}>
          {data?.title}
        </Text>
        <Entypo name="chevron-right" size={20} color="#ffffff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listWrapper}>
      <DrawerContentScrollView
        contentContainerStyle={{
          justifyContent: "space-between",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileView}>
          <View style={styles.profile}>
            <Image
              source={
                profile
                  ? { uri: profile }
                  : require("../../assets/dummy/dummyProfile.png")
              }
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.userName}>
              <Text style={font(14, "#FFFFFF", "Semibold", 5)}>
                {user_details?.realName}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewProfileBtn}
              onPress={() => navigation?.navigate("MyProfile")}
            >
              <Text style={font(11, "#FFFFFF", "Regular", 2)}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          {sideMenuOptions?.map((item, index) => {
            // if (index == 12) return;
            return <ListItem data={item} key={index} />;
          })}
        </View>
        {/* <ListItem data={sideMenuOptions[12]} /> */}
      </DrawerContentScrollView>
    </View>
  );
};

export default SideMenu;
