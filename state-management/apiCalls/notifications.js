import axios from "axios";

export const delete_notification = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/notification/${id}`);
      const notificationsDocs = result?.data;
      resolve(notificationsDocs);
    } catch (error) {
      console.log("Error deleting notifications :", error);
      reject(error);
    }
  });
};

export const update_notification = async (id, notification_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        `/notification/${id}`,
        notification_details
      );
      const notificationsDocs = result?.data;
      resolve(notificationsDocs);
    } catch (error) {
      console.log("Error updating notifications :", error);
      reject(error);
    }
  });
};

export const add_notification = async (notification_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/notification/create`, notification_details);
      const notificationsDoc = result?.data;
      resolve(notificationsDoc);
    } catch (error) {
      console.log("Error sending notifications :", error);
      reject(error);
    }
  });
};

export const get_notifications = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/notification/${id}`);
      const notificationsDocs = result?.data;
      resolve(notificationsDocs);
    } catch (error) {
      console.log("Error getting notifications :", error);
      reject(error);
    }
  });
};
