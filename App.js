import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { RecoilRoot } from "recoil";
import { AuthNavigator } from "./routes/AuthNavigator";
import { firebaseConfig } from "./utils";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);
  const [userStatus, setUserStatus] = useState(null);

  const config = {
    name: "SECONDARY_APP",
  };

  useEffect(() => {
    if (firebase?.apps?.length > 0) return;
    (async () => {
      await firebase.initializeApp(firebaseConfig, config);
    })();
  }, []);

  
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      <AppNavigator />
    </RecoilRoot>
  );
}
