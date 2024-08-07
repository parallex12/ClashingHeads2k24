import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectAuthUser } from "../features/auth";

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
    if (currentUser && socket) {
      socket.emit("appjoin", {userId:currentUser?._id});
    }
  }, [currentUser,socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
