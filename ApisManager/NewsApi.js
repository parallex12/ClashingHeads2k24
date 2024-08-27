import axios from "axios";

class NewsApi {
  //Api method to createNotification
  async getNews(pageParam) {
    try {
      let pageSize = 4;
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=30026c906e3044828175b52bbe0736bd&pageSize=${pageSize}&page=${pageParam}`;
      // Make the API request using fetch
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Return the JSON data from the response
    } catch (e) {
      console.log("NewsApi Error", e);
    }
  }

  //Api method to createNotification
  async searchNews(pageParam, search = "") {
    try {
      let pageSize = 4;
      let url = `https://newsapi.org/v2/everything?q=${search}&apiKey=30026c906e3044828175b52bbe0736bd&pageSize=${pageSize}&page=${pageParam}`;
      // Make the API request using fetch
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Return the JSON data from the response
    } catch (e) {
      console.log("NewsApi Error", e);
    }
  }
}

export default NewsApi;
