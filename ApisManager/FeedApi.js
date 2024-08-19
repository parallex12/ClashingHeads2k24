import axios from "axios";

class FeedApi {
  //Api method to getUserFeed by token
  async getUserFeed(page) {
    try {
      let limit = 10;
      let result = await axios.get(`/feed/${page}/${limit}`);
      return { code: 200, feed: result?.data };
    } catch (e) {
      console.log("FeedApi getUserFeed Error", e);
    }
  }
}

export default FeedApi;
