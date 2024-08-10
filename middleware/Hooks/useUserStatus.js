import { useEffect } from "react";
import { AppState } from "react-native";
import { useDispatch } from "react-redux";
import { useSocket } from "../../state-management/apiCalls/SocketContext";

export const useUserStatus = (userId) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log("App state changed:", nextAppState);

      if (nextAppState === "active") {
        // App is in the foreground
        console.log(`User ${userId} is online`);
        socket.emit("appjoin", { userId }); // Notify server that the user is online
      } else if (nextAppState.match(/inactive|background/)) {
        // App is in the background or inactive
        console.log(`User ${userId} is offline`);
        socket.emit("appLeave", { userId }); // Notify server that the user is offline
      }
    };

    // Subscribe to app state changes
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Set initial status based on current app state
    const initialState = AppState.currentState;
    console.log("Initial app state:", initialState);
    if (initialState === "active") {
      console.log(`User ${userId} is online`);
      socket.emit("appjoin", { userId });
    } else {
      console.log(`User ${userId} is offline`);
      socket.emit("appLeave", { userId });
    }

    // Cleanup subscription on unmount
    return () => {
      console.log(`Cleaning up for user ${userId}`);
      subscription.remove();
      // Optionally, notify server about disconnection when the component unmounts
      socket.emit("appLeave", { userId });
    };
  }, [userId, dispatch, socket]);

  // Optionally, handle socket connection errors or other events
  useEffect(() => {
    const handleError = (error) => {
      console.error("Socket connection error:", error);
    };

    socket.on("connect_error", handleError);

    // Cleanup on unmount
    return () => {
      socket.off("connect_error", handleError);
    };
  }, [socket]);
};
