import axios from "axios";

export const get_user_chats = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/chat/${id}`);
      const chatDocs = result?.data;
      resolve(chatDocs);
    } catch (error) {
      console.log("Error getting chats :", error);
      reject(error);
    }
  });
};

export const delete_user_chat = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/chat/${id}`);
      const chatDocs = result?.data;
      resolve(chatDocs);
    } catch (error) {
      console.log("Error deleting chats :", error);
      reject(error);
    }
  });
};

export const update_user_chat = async (id, chat_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(`/chat/${id}`, chat_details);
      const chatDocs = result?.data;
      resolve(chatDocs);
    } catch (error) {
      console.log("Error updating chats :", error);
      reject(error);
    }
  });
};

export const create_get_user_chat = async (participants) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(participants);
      const result = await axios.post(`/chat/connect`, participants);
      const chatDocs = result?.data;
      resolve(chatDocs);
    } catch (error) {
      console.log("Error connecting chats :", error);
      reject(error);
    }
  });
};

export const send_message = async (message_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/message`, message_details);
      const messageDoc = result?.data;
      resolve(messageDoc);
    } catch (error) {
      console.log("Error sending messages :", error);
      reject(error);
    }
  });
};

export const get_messages = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/message/${id}`);
      const messageDocs = result?.data;
      resolve(messageDocs);
    } catch (error) {
      console.log("Error getting messages :", error);
      reject(error);
    }
  });
};
