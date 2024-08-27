import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { setAuthToken } from "../middleware";
import { useQueryClient } from "react-query";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem("apptoken");
      await queryClient.invalidateQueries();
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("apptoken");
    } catch (error) {
      Alert.alert("Error", "Failed to retrieve the token.");
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("apptoken");
        if (token) {
          setAuthToken(token);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load authentication token.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getToken }}>
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
