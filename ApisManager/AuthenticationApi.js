import axios from "axios";

class AuthenticationApi {
  //Api method to send otp to phone for authentication
  async loginWithPhone(phone) {
    try {
      let result = await axios.post("/auth/phone", { phone });
      return result.data;
    } catch (e) {
      console.log("AuthenticationApi loginWithPhone Error", e);
    }
  }

  //Api method to verify otp and provide jwt token
  async verifyOtp(phone, otp) {
    try {
      if (!phone || !otp) throw new Error("Phone, OTP required");
      let result = await axios.post("/auth/verifyOtp", { phone, otp });
      return result.data;
    } catch (e) {
      console.log("AuthenticationApi loginWithPhone Error", e);
    }
  }
}

export default AuthenticationApi;
