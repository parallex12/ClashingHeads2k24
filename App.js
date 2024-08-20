import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { LogBox } from "react-native";
import store from "./state-management/store/store";
import axios from "axios";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { AuthProvider, useAuth } from "./ContextProviders/AuthProvider";
import { AuthNavigator } from "./routes/AuthNavigator";
import { app } from "./utils/firebaseInitialize";
import { QueryClient, QueryClientProvider } from "react-query";
import { SocketProvider } from "./ContextProviders/SocketContext";

function MainNavigator() {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</>;
}

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);
  const queryClient = new QueryClient();

  // axios.defaults.baseURL =
  //   "https://clashingheads2024v3-57b569714f9e.herokuapp.com/clashingheads_api";
  axios.defaults.baseURL = "http://192.168.100.127:3000/clashingheads_api";

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <MainNavigator />
          </SocketProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
