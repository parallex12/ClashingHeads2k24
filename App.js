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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  // axios.defaults.baseURL = "http://62.135.167.72.host.secureserver.net:6500/ch_content/";
  axios.defaults.baseURL = "http://192.168.100.127:6500/ch_content/";
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
