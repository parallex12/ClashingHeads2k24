import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../screens/Authentication/Signin/Signin";
import Signup from "../screens/Authentication/Signup/Signup";
import OTPVerification from "../screens/Authentication/OTPVerification/OTPVerification";
import CommunityGuidelines from "../screens/Authentication/CommunityGuidelines/CommunityGuidelines";
import PersonalInfo from "../screens/Authentication/PersonalInfo/PersonalInfo";

const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Signin" component={Signin} />
      <Screen name="Signup" component={Signup} />
      <Screen name="OTPVerification" component={OTPVerification} />
      <Screen name="CommunityGuidelines" component={CommunityGuidelines} />
      <Screen name="PersonalInfo" component={PersonalInfo} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
