import { useSocket } from "./SocketContext";

export const useChatSocketService = () => {
  const socket = useSocket();
  const joinRoom = (room, userId) => {
    if (socket) {
      socket.emit("join", { room, userId });
      console.log("Room Joined:", room);
    }
  };

  const leaveRoom = (room) => {
    if (socket) {
      socket.emit("leave", room);
      console.log("Left Room:", room);
    }
  };

  const sendMessage = (room, message, participants) => {
    if (socket) {
      socket.emit("message", { room, message, participants });
      console.log("Message Sent:", message);
    }
  };

  const receiveMessage = (callback) => {
    if (socket) {
      socket.on("message", callback);
      console.log("Message Listener Registered");
    }
  };

  const receiveChat = (callback) => {
    if (socket) {
      socket.on("screenchats", callback);
      console.log("screenchats Listener Registered");
    }
  };

  const listenreadMessages = (callback) => {
    if (socket) {
      socket.on("messagesRead", callback);
      console.log("Message Reader Registered");
    }
  };

  return {
    socket,
    joinRoom,
    leaveRoom,
    sendMessage,
    receiveMessage,
    listenreadMessages,
    receiveChat,
  };
};
