import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { LogBox } from "react-native";
import { AuthNavigator } from "./routes/AuthNavigator";
import { firebaseConfig } from "./utils";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import store from "./state-management/store/store";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);

  const config = {
    name: "SECONDARY_APP",
  };

  useEffect(() => {
    if (firebase?.apps?.length > 0) return;
    (async () => {
      await firebase.initializeApp(firebaseConfig, config);
    })();
  }, []);



  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
