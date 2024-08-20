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
import { useNavigation } from "@react-navigation/native";
import LogoutPress from "../LogoutPress";
import { useDispatch } from "react-redux";
import { onUpdateMenu } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import CacheImage from "../CacheImage";
import { useQueryClient } from "react-query";

const ListItem = ({ data }) => {
  let { width, height } = useWindowDimensions();
  let styles = SideMenuStyles({ width, height });
  const navigation = useNavigation();

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
        <Text style={font(16, "#FFFFFF", "Regular", 0, null, { flex: 1 })}>
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
      <Text style={font(16, "#FFFFFF", "Regular", 0, null, { flex: 1 })}>
        {data?.title}
      </Text>
      <Entypo name="chevron-right" size={20} color="#ffffff" />
    </TouchableOpacity>
  );
};

const SideMenu = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = SideMenuStyles({ width, height });
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const user_details = userDataCached?.user;
  let profile = user_details?.profile_photo;
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus();

  useEffect(() => {
    dispatch(onUpdateMenu(isDrawerOpen));
  }, [isDrawerOpen]);

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
            <CacheImage
              source={{ uri: profile }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
              hash={user_details?.profile_hash}
            />
          </View>
          <TouchableOpacity
            style={styles.info}
            onPress={() => navigation?.navigate("MyProfile")}
          >
            <View style={styles.userName}>
              <Text style={font(16, "#FFFFFF", "Semibold", 3)}>
                {user_details?.realName}
              </Text>
            </View>
            <View style={styles.viewProfileBtn}>
              <Text style={font(13, "#FFFFFF", "Regular")}>
                @{user_details?.username}
              </Text>
            </View>
          </TouchableOpacity>
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
