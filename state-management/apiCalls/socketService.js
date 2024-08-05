import io from "socket.io-client";

const SOCKET_URL = "http://192.168.100.127:5000";

let socket;

export const joinRoom = (room) => {
  if (socket) {
    socket.emit("join", room);
    console.log("Room Joined:", room);
  }
};

export const leaveRoom = (room) => {
  if (socket) {
    socket.emit("leave", room);
    console.log("Left Room:", room);
  }
};

export const sendMessage = (room, message) => {
  if (socket) {
    socket.emit("message", { room, message });
    console.log("Message Sent:", message);
  }
};

export const receiveMessage = (callback) => {
  if (socket) {
    socket.on("message", callback);
    console.log("Message Listener Registered");
  }
};

export const readMessages = (chatId, userId) => {
  if (socket) {
    socket.emit("readMessages", { chatId, userId });
    console.log("Message Reader Registered");
  }
};
