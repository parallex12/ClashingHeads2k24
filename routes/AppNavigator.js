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
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
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
import News from "../screens/News/News";
import EditPersonalInformation from "../screens/EditPersonalInformation/EditPersonalInformation";
import Notifications from "../screens/Notifications/Notifications";
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import SecuritySettings from "../screens/SecuritySettings/SecuritySettings";
import NotificationSettings from "../screens/NotificationSettings/NotificationSettings";
import PrivacySettings from "../screens/PrivacySettings/PrivacySettings";
import { user_auth } from "../state-management/atoms/atoms";
import { useRecoilValue } from "recoil";
import FullScreenLoader from "../globalComponents/FullScreenLoader/FullScreenLoader";

const { Navigator, Screen } = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeScreens = () => {
  const userAuth = useRecoilValue(user_auth);
  return (
    <HomeStack.Navigator>
      {!userAuth ? (
        // Screens for logged in users
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <Screen name="Signin" component={Signin} />
          <Screen name="Signup" component={Signup} />
          <Screen name="OTPVerification" component={OTPVerification} />
        </HomeStack.Group>
      ) : (
        // Auth screens
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Home" component={Home} />
          <Screen name="PersonalInfo" component={PersonalInfo} />
          <Screen name="VoiceRecording" component={VoiceRecording} />
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
          <HomeStack.Screen name="News" component={News} />
          <HomeStack.Screen name="AddPostDetails" component={AddPostDetails} />
          <HomeStack.Screen
            name="SecuritySettings"
            component={SecuritySettings}
          />
          <HomeStack.Screen
            name="AccountSettings"
            component={AccountSettings}
          />
          <HomeStack.Screen
            name="NotificationSettings"
            component={NotificationSettings}
          />
          <HomeStack.Screen
            name="PrivacySettings"
            component={PrivacySettings}
          />
          <HomeStack.Screen
            name="EditPersonalInformation"
            component={EditPersonalInformation}
          />
          <HomeStack.Screen name="Notifications" component={Notifications} />
          <HomeStack.Screen name="ProfilePhoto" component={ProfilePhoto} />
          <HomeStack.Screen
            name="CommunityGuidelines"
            component={CommunityGuidelines}
          />
        </HomeStack.Group>
      )}
    </HomeStack.Navigator>
  );
};

function AppNavigation() {
  return (
    <Navigator
      drawerContent={(props) => <SideMenu {...props} />}
      screenOptions={{
        swipeEnabled: false, // Disable swipe gesture for drawer
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
    <FullScreenLoader />
  </NavigationContainer>
);
