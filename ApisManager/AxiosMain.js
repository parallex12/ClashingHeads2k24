import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "../ContextProviders/AuthProvider";

// Create an instance of axios
const api = axios.create({
  baseURL: process.env.DEV_URL, // Replace with your API base URL
});

// Custom hook to configure and use Axios
const useApi = () => {
  const { logout } = useAuth();
  useEffect(() => {
    
    // Set up the interceptor
    console.log("useApi")
    const interceptor = api.interceptors.response.use(
      (response) => response, // If the response is successful, just return the response
      (error) => {
        const { status } = error.response || {};
        console.log("status",status)
        if (status === 401) {
          // Handle 401 Unauthorized error
          Alert.alert(
            "Session Expired",
            "Your session has expired. Please log in again.",
            [
              {
                text: "OK",
                onPress: () => {
                  // Sign out the user and redirect to the login screen
                  logout();
                },
              },
            ]
          );
        }

        // Handle other errors if needed
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [logout,api]);

  return api;
};

export default useApi;
