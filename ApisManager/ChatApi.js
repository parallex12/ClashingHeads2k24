import axios from "axios";

class ChatApi {
  //Api method to getChatById byId
  async getChatById(id) {
    try {
      let result = await axios.get(`/chats/${id}`);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("ChatApi getChatById Error", e);
    }
  }

  //Api method to updateChatById byId
  async updateChatById(id, details) {
    try {
      let result = await axios.patch(`/chats/${id}`, { ...details });
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("ChatApi updateChatById Error", e);
    }
  }
  //Api method to deleteChatById
  async deleteChatById(id) {
    try {
      let result = await axios.delete(`/chats/${id}`);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("ChatApi deleteChatById Error", e);
    }
  }

  //Api method to createChat
  async createChat(details) {
    try {
      let result = await axios.post(`/chats`, details);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("ChatApi createChat Error", e);
    }
  }
}

export default ChatApi;
