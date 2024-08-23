import { validateRequiredFields } from "../utils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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

export const validate_post_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredFields = ["author", "title"];
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

export const validate_clash_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredFields = [
        "challenger",
        "title",
        "opponent",
        "challenger_audio",
      ];
      const validation = validateRequiredFields(details, requiredFields);
      if (!validation.isValid) {
        reject({ msg: validation.msg, field: validation.field });
        return;
      }
      // If email and username are unique, resolve
      resolve({ code: 200, msg: "Clash details are valid" });
    } catch (error) {
      console.error(error);
      reject("Error validating user details");
    }
  });
};

export const uploadMedia = (media, path, mediaName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const audioRes = await fetch(media);
      const _Blob = await audioRes.blob();
      let _mediaName = mediaName || _Blob?._data?.name;
      const storage = getStorage();
      const _ref = ref(storage, `${path}/${_mediaName}`);

      const uploadTask = uploadBytesResumable(_ref, _Blob);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject({ msg: e.message, code: 500 });
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ url: downloadURL, code: 200, mediaName: _mediaName });
            console.log("File available at", downloadURL);
            //perform your task
          });
        }
      );
    } catch (e) {
      reject({ msg: e.message, code: 500 });
    }
  });
};
