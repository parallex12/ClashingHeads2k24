import axios from "axios";

class NotificationsApi {
  //Api method to sendNotification
  async sendNotification(details) {
    console.log(details)
    try {
      let result = await axios.post(`/notifications/send`, details);
      return result?.data;
    } catch (e) {
      console.log("NotificationsApi sendNotification Error", e);
    }
  }

  //Register User notification token
  async sendTokenToBackend(token) {
    try {
      let result = await axios.post(`/notifications/register`, { token });
      return result?.data;
    } catch (e) {
      console.log("NotificationsApi sendTokenToBackend Error", e);
    }
  }

  //Get all notifications

  async getNotifications() {
    try {
      let result = await axios.get(`/notifications`);
      return result?.data;
    } catch (e) {
      console.log("NotificationsApi sendTokenToBackend Error", e);
    }
  }
}

export default NotificationsApi;
