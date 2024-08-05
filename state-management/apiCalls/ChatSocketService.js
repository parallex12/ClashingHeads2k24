import { useSocket } from "./SocketContext";

export const useChatSocketService = () => {
  const socket = useSocket();
  const joinRoom = (room) => {
    if (socket) {
      socket.emit("join", room);
      console.log("Room Joined:", room);
    }
  };

  const leaveRoom = (room) => {
    if (socket) {
      socket.emit("leave", room);
      console.log("Left Room:", room);
    }
  };

  const sendMessage = (room, message) => {
    if (socket) {
      socket.emit("message", { room, message });
      console.log("Message Sent:", message);
    }
  };

  const receiveMessage = (callback) => {
    if (socket) {
      socket.on("message", callback);
      console.log("Message Listener Registered");
    }
  };
  const readMessages = (chatId, userId) => {
    if (socket) {
      socket.emit("readMessages", { chatId, userId });
      console.log("Message Reader Registered");
    }
  };

  return { socket, joinRoom, leaveRoom, sendMessage, receiveMessage,readMessages };
};
