import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AppState } from "react-native";
import { useQuery } from "react-query";
import UserApi from "../ApisManager/UserApi";

const SocketContext = createContext();

const SOCKET_URL = "http://192.168.100.127:3000";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { getUserProfile } = new UserApi();
  const usersQuery = useQuery(["currentUserProfile"], getUserProfile);
  const currentUser = usersQuery.data?.user;

  useEffect(() => {
    try {
      const socketInstance = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
      });

      socketInstance.on("connect", () => {
        console.log("Connected to socket server:", socketInstance.id);
      });
      socketInstance.on("connect-error", () => {
        console.log("connect-error to socket server:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      setSocket(socketInstance);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {

    if (currentUser?._id && socket) {
      socket.emit("appjoin", { userId: currentUser?._id });

      const handleAppStateChange = (nextAppState) => {
        if (nextAppState === "active") {
          console.log(`User ${currentUser._id} is online`);
          socket.emit("appjoin", { userId: currentUser._id });
        } else if (nextAppState.match(/inactive|background/)) {
          console.log(`User ${currentUser._id} is offline`);
          socket.emit("appLeave", { userId: currentUser._id });
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
        socket.emit("appjoin", { userId: currentUser._id });
      } else {
        socket.emit("appLeave", { userId: currentUser._id });
      }

      // Cleanup on unmount
      return () => {
        subscription.remove();
        socket.emit("appLeave", { userId: currentUser._id });
      };
    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
