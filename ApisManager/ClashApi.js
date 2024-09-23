import axios from "axios";
import { uploadMedia } from "../middleware/firebase";

class ClashApi {
  //Api method to getClashesByPostId byId
  async getClashesByPostId(postId, pageParam) {
    try {
      let result = await axios.get(`/clashes/${postId}?cursor=${pageParam}`);
      return result?.data;
    } catch (e) {
      console.log("ClashApi getClashesByPostId Error", e);
    }
  }

  //Api method to updateClashById byId
  async updateClashById(id, details) {
    try {
      let result = await axios.patch(`/clashes/${id}`, { ...details });
      return result?.data;
    } catch (e) {
      console.log("ClashApi updateClashById Error", e);
    }
  }
  //Api method to deleteClashById
  async deleteClashById(id) {
    try {
      let result = await axios.delete(`/clashes/${id}`);
      return result?.data;
    } catch (e) {
      console.log("ClashApi deleteClashById Error", e);
    }
  }

  //Api method to createClash
  async createClash(details, cb) {
    try {
      let { recording, clashType } = details;
      if (recording && clashType == "mic") {
        let { url } = await uploadMedia(recording, "clashesAudios");
        details["recording"] = url;
      }
      let result = await axios.post(`/clashes/create`, details);
      return result?.data;
    } catch (e) {
      console.log("ClashApi createClash Error", e);
    }
  }
}

export default ClashApi;
