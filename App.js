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
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import FullScreenLoader from "./globalComponents/FullScreenLoader/FullScreenLoader";
import { LoaderProvider } from "./state-management/LoaderContext";

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

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    });
  }, [auth]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <StatusBar style="auto" />
      {userStatus ? <AppNavigator /> : <AuthNavigator />}
    </RecoilRoot>
  );
}
