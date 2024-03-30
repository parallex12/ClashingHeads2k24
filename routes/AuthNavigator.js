import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../screens/Authentication/Signin/Signin";
import Signup from "../screens/Authentication/Signup/Signup";
import OTPVerification from "../screens/Authentication/OTPVerification/OTPVerification";
import CommunityGuidelines from "../screens/Authentication/CommunityGuidelines/CommunityGuidelines";
import PersonalInfo from "../screens/Authentication/PersonalInfo/PersonalInfo";
import VoiceRecording from "../screens/Authentication/VoiceRecording/VoiceRecording";
import ProfilePhoto from "../screens/Authentication/ProfilePhoto/ProfilePhoto";
import { createDrawerNavigator } from "@react-navigation/drawer";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Signin" component={Signin} />
      <Screen name="Signup" component={Signup} />
      <Screen name="CommunityGuidelines" component={CommunityGuidelines} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="PersonalInfo" component={PersonalInfo} />
      <Screen name="VoiceRecording" component={VoiceRecording} />
      <Screen name="ProfilePhoto" component={ProfilePhoto} />
    </Navigator>
  );
}
export const AuthNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
