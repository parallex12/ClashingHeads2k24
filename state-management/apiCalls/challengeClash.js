import axios from "axios";
import { uploadMedia } from "../../middleware/firebase";

export const delete_challenge_by_id = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/challenges/${id}`);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error deleting clash:", error);
      reject(error);
    }
  });
};

export const update_challenge_by_id = async (id, clash_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(`/challenges/${id}`, clash_details);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error updating clash:", error);
      reject(error);
    }
  });
};

export const create_challenge_clash = async (clash_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { challenger_audio } = clash_details;
      let { url } = await uploadMedia(
        challenger_audio,
        "ChallengeClashesAudios"
      );
      clash_details["challenger_audio"] = url;
      const result = await axios.post(`/challenges/create`, clash_details);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error adding challenge:", error);
      reject(error);
    }
  });
};

export const get_all_challenges = async (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/challenges/all?page=${page}`);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error adding challenge:", error);
      reject(error);
    }
  });
};
