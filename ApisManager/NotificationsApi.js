import axios from "axios";

class NotificationsApi {
  //Api method to createNotification
  async createNotification(details) {
    try {
      let result = await axios.post(`/notifications`, details);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("NotificationsApi createNotification Error", e);
    }
  }
}

export default NotificationsApi;
