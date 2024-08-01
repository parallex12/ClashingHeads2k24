import axios from "axios";
import { uploadMedia } from "../../middleware/firebase";

export const delete_clash_by_id = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/clashes/${id}`);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error deleting clash:", error);
      reject(error);
    }
  });
};

export const update_clash_by_id = async (id, clash_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(`/clashes/${id}`, clash_details);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error updating clash:", error);
      reject(error);
    }
  });
};

export const create_clash = async (clash_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { recording, clashType } = clash_details;
      if (recording && clashType == "mic") {
        let { url } = await uploadMedia(recording, "clashesAudios");
        clash_details["recording"]=url
      }
      const result = await axios.post(`/clashes/create`, clash_details);
      const clashDoc = result?.data;
      resolve(clashDoc);
    } catch (error) {
      console.log("Error adding clash:", error);
      reject(error);
    }
  });
};
