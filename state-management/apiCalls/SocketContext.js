import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AppState } from "react-native";
import { useQueryClient } from "react-query";

const SocketContext = createContext();

const SOCKET_URL = "https://clashing-heads-server.vercel.app";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;

  useEffect(() => {
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
  }, [currentUser, socket,userDataCached]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
