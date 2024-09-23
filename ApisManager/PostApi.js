import axios from "axios";
import { uploadMedia } from "../middleware/firebase";

class PostApi {
  //Api method to getPost byId
  async getPostById(id) {
    try {
      let result = await axios.get(`/posts/${id}`);
      return { code: 200, post: result?.data };
    } catch (e) {
      console.log("PostApi getPostById Error", e);
    }
  }

  //Api method to getPostChallengesByUserId
  async getPostChallengesByUserId(id) {
    try {
      let result = await axios.get(`/posts/challenge/${id}`);
      return { code: 200, challenges: result?.data };
    } catch (e) {
      console.log("PostApi getPostChallengesByUserId Error", e);
    }
  }

  //Api method to getUserProfile
  async searchPosts(query) {
    try {
      let result = await axios.get(`/posts/search?q=${query}`);
      return result?.data;
    } catch (e) {
      console.log("UserApi getUserProfile Error", e);
    }
  }

  //Api method to getUserProfile
  async searchChallenges(query) {
    try {
      let result = await axios.get(`/posts/search/challenges?q=${query}`);
      return result?.data;
    } catch (e) {
      console.log("UserApi getUserProfile Error", e);
    }
  }

  //Api method to getAllPost by user
  async getUsersPosts(id, pageParam) {
    try {
      let result = await axios.get(`/posts/user/${id}?cursor=${pageParam}`);
      return result?.data;
    } catch (e) {
      console.log("PostApi getAllPost Error", e);
    }
  }

  //Api method to updatePost byId
  async updatePostById(id, details) {
    try {
      let result = await axios.patch(`/posts/${id}`, { ...details });
      return { code: 200, posts: result?.data };
    } catch (e) {
      console.log("PostApi updatePostById Error", e);
    }
  }
  //Api method to deletePostById
  async deletePostById(id) {
    try {
      let result = await axios.delete(`/posts/${id}`);
      return { code: 200, posts: result?.data };
    } catch (e) {
      console.log("PostApi deletePostById Error", e);
    }
  }

  //Api method to createPost
  async createPost(details) {
    try {
      if (details?.recording) {
        let { url } = await uploadMedia(details?.recording, "post_recordings");
        details["recording"] = url;
      }
      if (details?.post_image) {
        let { url } = await uploadMedia(details?.post_image, "post_images");
        details["post_image"] = url;
      }
      let result = await axios.post(`/posts/create`, details);
      return { code: 200, posts: result?.data };
    } catch (e) {
      console.log("PostApi createPost Error", e);
    }
  }
}

export default PostApi;
