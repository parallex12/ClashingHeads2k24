import axios from "axios";

export const connectUserToDb = async (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/users/connect/${phone}`);
      if (!result?.data?.error) {
        let { hasPersonalInfo, hasVoiceAdded, hasProfilePhoto } = result?.data;
        if (!hasPersonalInfo) {
          resolve({ code: 200, user: result?.data, goTo: "PersonalInfo" });
          return;
        }
        if (!hasVoiceAdded) {
          resolve({ code: 200, user: result?.data, goTo: "VoiceRecording" });
          return;
        }

        if (!hasProfilePhoto) {
          resolve({ code: 200, user: result?.data, goTo: "ProfilePhoto" });
          return;
        }

        resolve(result?.data);
      } else {
        const result_user = await axios.post(`/users/create`, { phone: phone });
        if (result_user?.data) {
          resolve({
            code: 200,
            user: result_user?.data,
            goTo: "CommunityGuidelines",
          });
        }
      }
    } catch (e) {
      console.log("user connection", e);
      reject(e);
    }
  });
};

export const update_user = async (id, userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(`/users/${id}`, userDetails);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error adding/updating user:", error);
      reject(error);
    }
  });
};

export const get_user_profile = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/users/${id}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error getting user:", error);
      reject(error);
    }
  });
};

export const delete_user = async (id, userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/users/${id}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error adding/deleting user:", error);
      reject(error);
    }
  });
};
