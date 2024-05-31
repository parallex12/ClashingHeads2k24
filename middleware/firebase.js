import {
    getAuth,
    PhoneAuthProvider,
    signInWithCredential,
    signOut,
  } from "firebase/auth";
  import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
  } from "firebase/storage";
import { setAuthToken } from "./index";
import { _setToken } from "../utils";
  
  export const _onPhoneAuth = (props) => {
    let { auth, phoneNumber, recaptchaVerifier, setShowMessage } = props;
    return new Promise(async (resolve, reject) => {
      try {
        let _phone = phoneNumber?.code + phoneNumber?.number;
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          _phone,
          recaptchaVerifier?.current
        );
        if (verificationId) {
          setShowMessage({
            text: "Verification code has been sent to your phone.",
          });
          resolve(verificationId);
        } else {
          reject();
        }
      } catch (err) {
        console.log(err);
        reject(err);
        setShowMessage({ text: `Error: ${err.message}`, color: "red" });
      }
    });
  };
  
  export const _onVerifyOtp = (props) => {
    let { auth, otp, verificationId } = props;
    return new Promise(async (resolve, reject) => {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        signInWithCredential(auth, credential)
          .then(async (res) => {
            setAuthToken(res?._tokenResponse?.idToken);
            _setToken();
            resolve(res);
            console.log("Phone authentication successful 👍");
          })
          .catch((e) => {
            reject(e.message);
          });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };
  
  export const SignOut = () => {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {})
        .catch((e) => {
          console.log(e.message);
        });
    } catch (e) {
      console.log(e.message);
    }
  };
  
  export const downloadMedia = (path) => {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = getStorage();
        getDownloadURL(ref(storage, path))
          .then(async (url) => {
            resolve(url);
          })
          .catch((e) => {
            console.log(e.message);
            reject({ msg: e.message, code: 500 });
          });
      } catch (e) {
        console.log(e.message);
        reject({ msg: e.message, code: 500 });
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
  