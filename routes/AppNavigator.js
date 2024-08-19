import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import News from "../screens/News/News";
import EditPersonalInformation from "../screens/EditPersonalInformation/EditPersonalInformation";
import Notifications from "../screens/Notifications/Notifications";
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import SecuritySettings from "../screens/SecuritySettings/SecuritySettings";
import NotificationSettings from "../screens/NotificationSettings/NotificationSettings";
import PrivacySettings from "../screens/PrivacySettings/PrivacySettings";
import FullScreenLoader from "../globalComponents/FullScreenLoader/FullScreenLoader";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../state-management/features/auth";
import ChallengeRequests from "../screens/ChallengeRequests/ChallengeRequests";
import ChallengeClash from "../screens/ChallengeClash/ChallengeClash";
import AddBio from "../screens/Authentication/AddBio/AddBio";
import ClashRoomMonetize from "../screens/ClashRoomMonetize/ClashRoomMonetize";
import Connections from "../screens/Connections/Connections";
import Invite from "../screens/Invite/Invite";
import Shop from "../screens/Shop/Shop";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import BottomMenu from "../globalComponents/BottomMenu/BottomMenu";
import { onScreenChange } from "../state-management/features/bottom_menu/bottom_menuSlice";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import EditPostDetails from "../screens/EditPost/EditPostDetails";
import Terms from "../screens/Authentication/Terms/Terms";
import PrivacyPolicy from "../screens/Authentication/PrivacyPolicy/PrivacyPolicy";
import Faqs from "../screens/Authentication/Faqs/Faqs";
import AboutUs from "../screens/Authentication/AboutUs/AboutUs";
import ContactUs from "../screens/Authentication/ContactUs/ContactUs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Navigator, Screen } = createDrawerNavigator();
const HomeStack = createStackNavigator();

const HomeScreens = () => {
  // const userAuth = useSelector(selectIsAuth);
  return (
    <HomeStack.Navigator>
      {/* //{!userAuth ? (
        // Screens for logged in users
        // <HomeStack.Group screenOptions={{ headerShown: false }}>
        //   <Screen name="Signin" component={Signin} />
        //   <Screen name="Signup" component={Signup} />
        //   <Screen name="OTPVerification" component={OTPVerification} />
        //   <HomeStack.Screen name="Terms" component={Terms} />
        // </HomeStack.Group>
      // ) : (
        // Auth screens
        )} */}
        <HomeStack.Group screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Home" component={Home} />
          <Screen name="PersonalInfo" component={PersonalInfo} />
          <Screen name="ChatScreen" component={ChatScreen} />
          <Screen name="AddBio" component={AddBio} />
          <Screen name="VoiceRecording" component={VoiceRecording} />
          <HomeStack.Screen name="ClashDetails" component={ClashDetails} />
          <HomeStack.Screen name="Search" component={Search} />
          <HomeStack.Screen name="Messages" component={Messages} />
          <HomeStack.Screen name="Clashes" component={Clashes} />
          <HomeStack.Screen name="AddClashers" component={AddClashers} />
          <HomeStack.Screen name="ClashRoom" component={ClashRoom} />
          <HomeStack.Screen name="CreateRoom" component={CreateRoom} />
          <HomeStack.Screen name="CreateClash" component={CreateClash} />
          <HomeStack.Screen name="ChallengeClash" component={ChallengeClash} />
          <HomeStack.Screen name="MyProfile" component={MyProfile} />
          <HomeStack.Screen name="UserProfile" component={UserProfile} />
          <HomeStack.Screen name="privacypolicy" component={PrivacyPolicy} />
          <HomeStack.Screen name="ContactUs" component={ContactUs} />
          <HomeStack.Screen name="AboutUs" component={AboutUs} />
          <HomeStack.Screen name="faqs" component={Faqs} />
          <HomeStack.Screen name="NewPost" component={NewPost} />
          <HomeStack.Screen name="Connections" component={Connections} />
          <HomeStack.Screen name="CalendarScreen" component={CalendarScreen} />
          <HomeStack.Screen name="Terms" component={Terms} />
          <HomeStack.Screen name="Shop" component={Shop} />
          <HomeStack.Screen name="Invite" component={Invite} />
          <HomeStack.Screen
            name="ClashRoomMonetize"
            component={ClashRoomMonetize}
          />
          <HomeStack.Screen name="News" component={News} />
          <HomeStack.Screen name="AddPostDetails" component={AddPostDetails} />
          <HomeStack.Screen
            name="EditPostDetails"
            component={EditPostDetails}
          />
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
            name="ChallengeRequests"
            component={ChallengeRequests}
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
    </HomeStack.Navigator>
  );
};

function AppNavigation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    navigation.addListener("state", () => {
      dispatch(onScreenChange(navigation.getCurrentRoute()?.name));
    });
  }, [navigation.getCurrentRoute()]);

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

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
      <BottomMenu />
      <FullScreenLoader />
    </NavigationContainer>
  );
};
