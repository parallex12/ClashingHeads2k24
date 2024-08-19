import axios from "axios";
import PostApi from "../../ApisManager/PostApi";

export const get_post_by_id = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/posts/${id}`);
      const postDoc = result?.data;
      resolve(postDoc);
    } catch (error) {
      console.log("Error getting post:", error);
      reject(error);
    }
  });
};

export const get_all_posts_test = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const api=new PostApi()
      const result = await api.getAllPost()
      const postDoc = result?.data;
      console.log(postDoc)
      resolve(postDoc);
    } catch (error) {
      console.log("Error getting post:", error);
      reject(error);
    }
  });
};

export const update_post_by_id = async (id, post_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(`/posts/${id}`, post_details);
      const postDoc = result?.data;
      resolve(postDoc);
    } catch (error) {
      console.log("Error updating post:", error);
      reject(error);
    }
  });
};
export const delete_post_by_id = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(`/posts/${id}`);
      const postDoc = result?.data;
      resolve(postDoc);
    } catch (error) {
      console.log("Error deleting post:", error);
      reject(error);
    }
  });
};

export const create_post = async (post_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`/posts/create`, post_details);
      const postDoc = result?.data;
      resolve(postDoc);
    } catch (error) {
      console.log("Error adding post:", error);
      reject(error);
    }
  });
};
