import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";
import {
  setOnline,
  setOffline,
} from "../../state-management/features/auth/presenceSlice"; // Adjust path as needed
import { update_user_details } from "../firebase"; // Adjust path as needed

// Custom hook to manage user status
export const useUserStatus = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        // App is in the foreground
        update_user_details(userId, { status: "online" });
        dispatch(setOnline());
      } else if (nextAppState.match(/inactive|background/)) {
        // App is in the background or inactive
        update_user_details(userId, { status: "offline" });
        dispatch(setOffline());
      }
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Set initial status based on current app state
    const initialState = AppState.currentState;
    if (initialState === "active") {
      update_user_details(userId, { status: "online" });
      dispatch(setOnline());
    } else {
      update_user_details(userId, { status: "offline" });
      dispatch(setOffline());
    }

    // Cleanup subscription on unmount
    return () => {
      subscription.remove();
      update_user_details(userId, { status: "offline" });
      dispatch(setOffline());
    };
  }, [userId, dispatch]);
};
