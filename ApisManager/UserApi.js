import axios from "axios";

class UserApi {
  //Api method to getUserProfile
  async getUserProfile() {
    try {
      let result = await axios.get(`/users/profile`);
      let { tos, hasPersonalInfo, hasVoiceAdded, hasProfilePhoto } =
        result?.data;
      if (!tos) {
        return { code: 200, user: result?.data, goTo: "CommunityGuidelines" };
      }
      if (!hasPersonalInfo) {
        return { code: 200, user: result?.data, goTo: "PersonalInfo" };
      }
      if (!hasVoiceAdded) {
        return { code: 200, user: result?.data, goTo: "VoiceRecording" };
      }

      if (!hasProfilePhoto) {
        return { code: 200, user: result?.data, goTo: "ProfilePhoto" };
      }
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("UserApi getUserProfile Error", e);
    }
  }

  //Api method to searchUsers
  async searchUsers(query, cursor) {
    try {
      let result = await axios.get(`/users/search?q=${query}`);
      return result?.data;
    } catch (e) {
      console.log("UserApi searchUsers Error", e);
    }
  }

  //Api method to followUser
  async followUser(uId, fuId) {
    try {
      let result = await axios.post(`users/follow/${uId}/${fuId}`);
      return result?.data;
    } catch (e) {
      console.log("UserApi followUser Error", e);
    }
  }

  //Api method to unfollowUser
  async unfollowUser(uId, fuId) {
    try {
      let result = await axios.post(`users/unfollow/${uId}/${fuId}`);
      return result?.data;
    } catch (e) {
      console.log("UserApi unfollowUser Error", e);
    }
  }

  //Api method to getUserProfile byId
  async getUserProfileById(id) {
    try {
      let result = await axios.get(`/users/profile/${id}`);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("UserApi getUserProfileById Error", e);
    }
  }

  //Api method to updateUserProfile byId
  async updateUserProfile(id, details) {
    try {
      let result = await axios.patch(`/users/${id}`, { ...details });
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("UserApi updateUserProfile Error", e);
    }
  }

  //Api method to createUserProfile
  async createUserProfile(details) {
    try {
      let result = await axios.post(`/users`, { ...details });
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("UserApi getUserProfileById Error", e);
    }
  }

  //Api method to deleteUserProfile by token
  async deleteUserProfile() {
    try {
      let result = await axios.delete(`/users`);
      return { code: 200, user: result?.data };
    } catch (e) {
      console.log("UserApi deleteUserProfile Error", e);
    }
  }
}

export default UserApi;
