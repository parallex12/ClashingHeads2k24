import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectAuthUser } from "../features/auth";
import { AppState } from "react-native";

const SocketContext = createContext();

const SOCKET_URL = "http://192.168.100.127:5000";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const currentUser = useSelector(selectAuthUser);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log("Connected to socket server:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
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
