class SocketService {
    constructor(socket) {
      this.socket = socket;
    }
  
    joinRoom(room, userId, participants) {
      this.socket.emit("join", { room, userId, participants });
      console.log("Room Joined:", room);
    }
  
    leaveRoom(room) {
      this.socket.emit("leave", room);
      console.log("Left Room:", room);
    }
  
    sendMessage(room, message, participants) {
      this.socket.emit("message", { room, message, participants });
      console.log("Message Sent:", message);
    }
  
    onMessage(callback) {
      this.socket.on("message", callback);
      console.log("Message Listener Registered");
    }
  
    offMessage(callback) {
      this.socket.off("message", callback);
      console.log("Message Listener Unregistered");
    }
  }
  
  export default SocketService;
  