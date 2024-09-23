import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { Alert, LogBox } from "react-native";
import store from "./state-management/store/store";
import axios from "axios";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import { AuthProvider, useAuth } from "./ContextProviders/AuthProvider";
import { AuthNavigator } from "./routes/AuthNavigator";
import { firebaseapp } from "./utils/firebaseInitialize";
import { QueryClient, QueryClientProvider } from "react-query";
import { SocketProvider } from "./ContextProviders/SocketContext";
import { NotificationProvider } from "./ContextProviders/NotificationProvider";
import FullScreenLoader from "./globalComponents/FullScreenLoader/FullScreenLoader";
import { useNetInfo } from "@react-native-community/netinfo";

function MainNavigator() {
  const { isLoggedIn, logout } = useAuth();
  axios.interceptors.response.use(
    (response) => response, // If the response is successful, just return the response
    (error) => {
      const { status } = error.response || {};
      if (status === 401) {
        logout();
      }
    }
  );
  return <>{isLoggedIn ? <AppNavigator /> : <AuthNavigator />}</>;
}

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);
  const net = useNetInfo();

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 10000 } },
  });
  axios.defaults.baseURL = process.env.PROD_URL;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <NotificationProvider>
              {!fontsLoaded || !net?.isConnected ? (
                <FullScreenLoader />
              ) : (
                <MainNavigator />
              )}
            </NotificationProvider>
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
