import axios from "axios";

class MessageApi {
  //Api method to updateMessageById byId
  async updateMessageById(id, details) {
    try {
      let result = await axios.patch(`/messages/${id}`, { ...details });
      return result?.data;
    } catch (e) {
      console.log("MessageApi updateMessageById Error", e);
    }
  }
  //Api method to deleteMessageById
  async deleteMessageById(id) {
    try {
      let result = await axios.delete(`/messages/${id}`);
      return result?.data;
    } catch (e) {
      console.log("MessageApi deleteMessageById Error", e);
    }
  }

  //Api method to createMessage
  async createMessage(details) {
    try {
      let result = await axios.post(`/messages`, details);
      return result?.data;
    } catch (e) {
      console.log("MessageApi createMessage Error", e);
    }
  }

  //Api method to getMessages by chatId
  async getChatMessages(chatId, pageParam) {
    try {
      let result = await axios.get(`/messages/${chatId}?cursor=${pageParam}`);
      return result?.data;
    } catch (e) {
      console.log("MessageApi getMessages Error", e);
    }
  }
}

export default MessageApi;
