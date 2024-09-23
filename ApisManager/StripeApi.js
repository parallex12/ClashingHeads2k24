import axios from "axios";

class StripeApi {
  //Api method to createPaymentIntent
  async createPaymentIntent(details) {
    try {
      let result = await axios.post(`/stripe/create-payment-intent`, details);
      return result?.data;
    } catch (e) {
      console.log("StripeApi createPaymentIntent Error", e);
    }
  }

  
}

export default StripeApi;
