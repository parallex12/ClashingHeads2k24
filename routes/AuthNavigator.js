import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "../screens/Authentication/Signin/Signin";
import Signup from "../screens/Authentication/Signup/Signup";
import OTPVerification from "../screens/Authentication/OTPVerification/OTPVerification";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Signin" component={Signin} />
      <Screen name="Signup" component={Signup} />
      <Screen name="OTPVerification" component={OTPVerification} />
    </Navigator>
  );
}
export const AuthNavigator = () => (
  <NavigationContainer>
    <AuthNavigation />
  </NavigationContainer>
);
