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
