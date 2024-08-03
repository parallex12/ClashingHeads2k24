import axios from "axios";

export const search_users = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/users/search?q=${query}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error getting user:", error);
      reject(error);
    }
  });
};

export const search_posts = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/posts/search?q=${query}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error getting user:", error);
      reject(error);
    }
  });
};


export const search_clashes = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(`/posts/search/challenges?q=${query}`);
      const userDoc = result?.data;
      resolve(userDoc);
    } catch (error) {
      console.log("Error getting user:", error);
      reject(error);
    }
  });
};
