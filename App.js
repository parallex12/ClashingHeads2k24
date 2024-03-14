import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AppNavigator } from "./routes/AppNavigator";
import { useFonts } from "expo-font";
import store from "./state-management/store";
import "react-native-gesture-handler";
import { FontsConfig } from "./middleware";
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const [fontsLoaded] = useFonts(FontsConfig);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <StatusBar style="dark" hidden  />
      <AppNavigator />
    </Provider>
  );
}
