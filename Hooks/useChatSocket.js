import { useEffect, useMemo } from "react";
import { useSocket } from "../ContextProviders/SocketContext";
import SocketService from "../ContextProviders/SocketService";

const useChatSocket = (room, userId, participants) => {
  const socket = useSocket();
  const socketService = useMemo(() => new SocketService(socket), [socket]);
  useEffect(() => {
    socketService.joinRoom(room, userId, participants);
    return () => socketService.leaveRoom(room);
  }, [room, userId, participants, socketService]);

  const sendMessage = (message) => {
    socketService.sendMessage(room, message, participants);
  };

  const receiveMessage = (callback) => {
    socketService.onMessage(callback);
    return () => socketService.offMessage(callback);
  };

  return { sendMessage, receiveMessage };
};

export default useChatSocket;
