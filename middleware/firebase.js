import auth from "@react-native-firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

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
      const docRef = doc(db, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve({ code: 200, user: docSnap.data() });
        console.log("User Profile Connected.");
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

export const Logout = async () => {
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));
};

export const validate_user_details = async (details) => {
  return new Promise((resolve, reject) => {
    try {
    } catch (e) {
      console.log(e);
    }
  });
};
