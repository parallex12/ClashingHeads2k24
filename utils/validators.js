import { validateRequiredFields } from "./index";

export const validate_post_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredFields = ["author", "title", "recording"];
      const validation = validateRequiredFields(details, requiredFields);
      if (!validation.isValid) {
        reject({ err: validation.msg, field: validation.field });
        return;
      }

      // If email and username are unique, resolve
      resolve({ code: 200, msg: "Post details are valid" });
    } catch (error) {
      console.error(error);
      reject({ msg: "Error validating user details" });
    }
  });
};

export const validate_user_details = async (details, user_profile_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Initialize Firestore

      // Define the required fields for validation
      const requiredFields = ["email", "username", "realName"];

      // Validate required fields
      const validation = validateRequiredFields(details, requiredFields);

      // If validation fails, reject with the appropriate message
      if (!validation.isValid) {
        reject({ msg: validation.msg, field: validation.field });
        return;
      }
      // If both checks pass, resolve with a success message
      resolve({ code: 200, msg: "User details are valid" });
    } catch (error) {
      // Log and reject with an error message in case of an exception
      console.error(error);
      reject("Error validating user details");
    }
  });
};
