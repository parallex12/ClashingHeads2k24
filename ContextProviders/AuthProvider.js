import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { setAuthToken } from "../middleware";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const login = () => setIsLoggedIn(true);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("apptoken");
    dispatch(setUserDetails({}));
  };

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("apptoken");
      if (token) {
        setAuthToken(token);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {loading ? (
        <View
          style={{ flex: 1, alignItem: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#222" size="large" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
