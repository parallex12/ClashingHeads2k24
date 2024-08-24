import axios from "axios";

class FeedApi {
  //Api method to getUserFeed by token
  async getUserFeed(pageParam) {
    try {
      let result = await axios.get(`/feed?cursor=${pageParam}`);
      return result?.data;
    } catch (e) {
      console.log("FeedApi getUserFeed Error", e);
    }
  }
}

export default FeedApi;
