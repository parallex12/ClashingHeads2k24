import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthProvider";

const SocketContext = createContext();

const SOCKET_URL = process.env.SOCKET_PROD_URL;

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { getToken } = useAuth();

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
    (async () => {
      let token = await getToken();
      if (token && socket) {
        console.log(token);
        socket.emit("appjoin", { token });

        const handleAppStateChange = (nextAppState) => {
          if (nextAppState === "active") {
            console.log(`User is online`);
            socket.emit("appjoin", { token });
          } else if (nextAppState.match(/inactive|background/)) {
            console.log(`User is offline`);
            socket.emit("appLeave", { token });
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
          socket.emit("appjoin", { token });
        } else {
          socket.emit("appLeave", { token });
        }

        // Cleanup on unmount
        return () => {
          subscription.remove();
          socket.emit("appLeave", { token });
        };
      }
    })();
  }, [socket,useAuth]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
