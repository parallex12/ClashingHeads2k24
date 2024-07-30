import axios from "axios";

export const connectUserToDb = async (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/auth/connect/${phone}`);
      if (result?.data) {
        let { hasPersonalInfo, hasVoiceAdded, hasProfilePhoto, tos } =
          result?.data;
        if (!tos) {
          resolve({
            code: 200,
            user: result?.data,
            goTo: "CommunityGuidelines",
          });
          return;
        }
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
        if (result_user?.data?.insertedId) {
          resolve({
            code: 200,
            user: { docId: result_user?.insertedId },
            goTo: "CommunityGuidelines",
          });
        } else {
          reject("Could not connect user");
        }
      }
    } catch (e) {
      console.log("user connection", e);
      reject(e);
      reject(e);
    }
  });
};

export const update_user = async (id, userDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id,userDetails)
      const result = await axios.patch(`/users/${id}`, userDetails);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error adding/updating user:", error);
      reject(error);
    }
  });
};
