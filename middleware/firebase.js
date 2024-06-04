import auth from "@react-native-firebase/auth";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { validateRequiredFields } from "../utils";
import { useRecoilState } from "recoil";
import { user_auth } from "../state-management/atoms/atoms";

export const getFirestoreDoc = async (collection, docID) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, collection, docID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e);
  }
};

export const isUserProfileConnected = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let { hasPersonalInfo, hasVoiceAdded, hasProfilePhoto } =
          docSnap?.data();
        if (!hasPersonalInfo) {
          resolve({ code: 200, user: docSnap.data(), goTo: "PersonalInfo" });
          return;
        }
        if (!hasVoiceAdded) {
          resolve({ code: 200, user: docSnap.data(), goTo: "VoiceRecording" });
          return;
        }

        if (!hasProfilePhoto) {
          resolve({ code: 200, user: docSnap.data(), goTo: "ProfilePhoto" });
          return;
        }

        resolve(200);
      } else {
        reject(404);
        console.log("No User Profile Connected!");
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export const Logout = async (setUserAuth) => {

  auth()
    .signOut()
    .then(() => {
      setUserAuth(null);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const validate_user_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if email already exists
      const db = getFirestore();
      const requiredFields = ["email", "username", "realName"];
      const validation = validateRequiredFields(details, requiredFields);

      if (!validation.isValid) {
        console.log(validation.msg); // Output: None, as all required fields are present
        reject({ msg: validation.msg, field: validation.field });
        return;
      }
      const emailQuery = query(
        collectionGroup(db, "users"),
        where("email", "==", details?.email)
      );
      const usernameQuery = query(
        collectionGroup(db, "users"),
        where("username", "==", details?.username)
      );

      const [emailSnapshot, usernameSnapshot] = await Promise.all([
        getDocs(emailQuery),
        getDocs(usernameQuery),
      ]);

      if (!emailSnapshot.empty) {
        reject({ msg: "Email already exists", field: "email" });
        return;
      }

      if (!usernameSnapshot.empty) {
        reject({ msg: "Username already exists", field: "username" });
        return;
      }

      // If email and username are unique, resolve
      resolve({ code: 200, msg: "User details are valid" });
    } catch (error) {
      console.error(error);
      reject("Error validating user details");
    }
  });
};
export const addUser = async (userId, userDetails) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    setDoc(userRef, userDetails)
      .then(() => {
        resolve("User userDetails successfully");
      })
      .catch((error) => {
        console.log("Error adding new user:", error);
        reject(error);
      });
  });
};

export const update_user_details = async (userId, updatedDetails) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "users", userId);
    updateDoc(userRef, updatedDetails)
      .then(() => {
        resolve("User details updated successfully");
      })
      .catch((error) => {
        console.log("Error adding new user:", error);
        reject(error);
      });
  });
};
