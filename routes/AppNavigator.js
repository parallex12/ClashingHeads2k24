import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "../screens/Home/Home";
import ClashDetails from "../screens/ClashDetail/ClashDetail";
import { createStackNavigator } from "@react-navigation/stack";
import SideMenu from "../globalComponents/SideMenu/SideMenu";
import Search from "../screens/Search/Search";
import Messages from "../screens/Messages/Messages";
import Clashes from "../screens/Clashes/Clashes";
import ClashRoom from "../screens/ClashRoom/ClashRoom";
import Signin from "../screens/Authentication/Signin/Signin";
import Signup from "../screens/Authentication/Signup/Signup";
import OTPVerification from "../screens/Authentication/OTPVerification/OTPVerification";
import CommunityGuidelines from "../screens/Authentication/CommunityGuidelines/CommunityGuidelines";
import PersonalInfo from "../screens/Authentication/PersonalInfo/PersonalInfo";
import VoiceRecording from "../screens/Authentication/VoiceRecording/VoiceRecording";
import ProfilePhoto from "../screens/Authentication/ProfilePhoto/ProfilePhoto";
import CreateRoom from "../screens/CreateRoom/CreateRoom";
import CreateClash from "../screens/CreateClash/CreateClash";
import AddClashers from "../screens/AddClashers/AddClashers";
import MyProfile from "../screens/MyProfile/MyProfile";
import UserProfile from "../screens/UserProfile/UserProfile";
import NewPost from "../screens/NewPost/NewPost";
import AddPostDetails from "../screens/NewPost/AddPostDetails";

const { Navigator, Screen } = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeScreens = () => {
  return (
    <HomeStack.Navigator  screenOptions={{ headerShown: false }}>
      <Screen name="Signin" component={Signin} />
      <Screen name="Signup" component={Signup} />
      <Screen name="CommunityGuidelines" component={CommunityGuidelines} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="PersonalInfo" component={PersonalInfo} />
      <Screen name="VoiceRecording" component={VoiceRecording} />
      <Screen name="ProfilePhoto" component={ProfilePhoto} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ClashDetails" component={ClashDetails} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="Messages" component={Messages} />
      <HomeStack.Screen name="Clashes" component={Clashes} />
      <HomeStack.Screen name="AddClashers" component={AddClashers} />
      <HomeStack.Screen name="ClashRoom" component={ClashRoom} />
      <HomeStack.Screen name="CreateRoom" component={CreateRoom} />
      <HomeStack.Screen name="CreateClash" component={CreateClash} />
      <HomeStack.Screen name="MyProfile" component={MyProfile} />
      <HomeStack.Screen name="UserProfile" component={UserProfile} />
      <HomeStack.Screen name="NewPost" component={NewPost} />
      <HomeStack.Screen name="AddPostDetails" component={AddPostDetails} />
    </HomeStack.Navigator>
  );
};

function AppNavigation() {
  return (
    <Navigator
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        swipeEnabled: true, // Disable swipe gesture for drawer
        headerShown: false,
        drawerType: "slide", // Set drawer type to slide
        drawerStyle: {
          width: "75%", // Set width of the drawer
          backgroundColor: "#D22323",
          paddingHorizontal: 20,
        },
      }}
    >
      <Screen name="HomeScreens" component={HomeScreens} />
    </Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
