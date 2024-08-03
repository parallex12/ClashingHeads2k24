import axios from "axios";

export const follow_user = async (id, fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/users/follow/${id}/${fid}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error follow user:", error);
      reject(error);
    }
  });
};

export const unfollow_user = async (id, fid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/users/unfollow/${id}/${fid}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error unfollow user:", error);
      reject(error);
    }
  });
};
