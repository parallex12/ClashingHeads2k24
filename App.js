import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { FontsConfig, setAuthToken } from "./middleware";
import { LogBox } from "react-native";
import { AuthNavigator } from "./routes/AuthNavigator";
import { firebaseConfig } from "./utils";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import store from "./state-management/store/store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import "./utils/firebaseInitialize";
export default function App() {
  // axios.defaults.baseURL =
  //   "https://clashing-heads-server.vercel.app/clashingheads_api";

  axios.defaults.baseURL = "http://192.168.100.127:5000/clashingheads_api";

  const [fontsLoaded] = useFonts(FontsConfig);
  const config = {
    name: "SECONDARY_APP",
  };
  const queryClient = new QueryClient();

  useEffect(() => {
    (async () => {
      if (firebase.apps.length === 0) {
        await firebase.initializeApp(firebaseConfig, config);
      }
      const idTokenResult = await auth().currentUser.getIdTokenResult();
      setAuthToken(idTokenResult.token);
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
}
