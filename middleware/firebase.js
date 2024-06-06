import auth from "@react-native-firebase/auth";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseQuerySort, sortPostsByCreatedAt, validateRequiredFields } from "../utils";
import { useRecoilState } from "recoil";
import { home_posts, user_auth } from "../state-management/atoms/atoms";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { HOME_POSTS, USER_DB_DETAILS } from "../state-management/types/types";

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



export const getHomePosts = () => async (dispatch) => {

  return new Promise(async (resolve, reject) => {

    try {
      const db = getFirestore();
      const postsCollection = collection(db, 'Posts');
      const q = query(postsCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        dispatch({ type: HOME_POSTS, payload: arr })
        resolve(arr);
      }, (error) => {
        console.log('Error getting documents: ', error);
        reject(error);
      });
      // Log when the listener is first attached

    } catch (e) {
      console.log('Error getting documents: ', error);
      reject(e)
    }
  })
};




export const isUserProfileConnected = async (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "Users", userID);
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

        resolve({ id: docSnap.id, ...docSnap?.data() });
      } else {
        reject(404);
        console.log("No User Profile Connected!");
      }
    } catch (e) {
      console.log("user connection", e);
      reject(e);
    }
  });
};

export const Logout = async (setUserAuth) => {
  // const resetList = useResetRecoilState(todoListState);
};

export const validate_user_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if email already exists
      const db = getFirestore();
      const requiredFields = ["email", "username", "realName"];
      const validation = validateRequiredFields(details, requiredFields);

      if (!validation.isValid) {
        reject({ msg: validation.msg, field: validation.field });
        return;
      }
      const emailQuery = query(
        collectionGroup(db, "Users"),
        where("email", "==", details?.email)
      );
      const usernameQuery = query(
        collectionGroup(db, "Users"),
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


export const validate_post_details = async (details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requiredFields = ["author", "title", "recording"];
      const validation = validateRequiredFields(details, requiredFields);
      if (!validation.isValid) {
        reject({ msg: validation.msg, field: validation.field });
        return;
      }


      // If email and username are unique, resolve
      resolve({ code: 200, msg: "Post details are valid" });
    } catch (error) {
      console.error(error);
      reject("Error validating user details");
    }
  });
};


export const addUser = async (userId, userDetails) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "Users", userId);
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
    const userRef = doc(db, "Users", userId);
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


export const createPost = async (post_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      let { url } = await uploadMedia(post_details?.recording, "post_recordings")
      post_details["recording"] = url

      if (post_details?.post_image) {
        let { url } = await uploadMedia(post_details?.post_image, "post_images")
        post_details["post_image"] = url
      }

      await addDoc(collection(db, "Posts"), post_details)
        .then((res) => {
          resolve({ msg: "Post added successfully", post_data: { id: res?.id, ...post_details } });
        })
        .catch((error) => {
          console.log("Error adding new post:", error);
          reject(error);
        });
    } catch (e) {
      reject(e)
    }
  });
};

export const update_post = async (postId, updatedDetails) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "Posts", postId);
    updateDoc(userRef, updatedDetails)
      .then(() => {
        resolve("Post details updated successfully");
      })
      .catch((error) => {
        console.log("Error updating  post:", error);
        reject(error);
      });
  });
};

export const update_post_reaction_locally = async (postData, userId, reactionType, setTempPostData) => {
  try {
    const userReactions = postData.reactions || {}; // { userId: 'like' or 'dislike' }

    let updatedLikes = postData.likes || 0;
    let updatedDislikes = postData.dislikes || 0;

    const currentReaction = userReactions[userId];
    // Remove user's current reaction
    if (currentReaction) {
      if (currentReaction === 'like') {
        updatedLikes -= 1;
      } else if (currentReaction === 'dislike') {
        updatedDislikes -= 1;
      }
    }

    // If the new reaction is the same as the current reaction, remove it
    if (currentReaction === reactionType) {
      delete userReactions[userId];
    } else {
      // Add new reaction
      if (reactionType === 'like') {
        updatedLikes += 1;
      } else if (reactionType === 'dislike') {
        updatedDislikes += 1;
      }

      // Update user reaction
      userReactions[userId] = reactionType;
      setTempPostData((prev) => {
        return {
          ...prev, likes: updatedLikes,
          dislikes: updatedDislikes,
          reactions: userReactions
        }
      })
    }

  } catch (e) {
    console.log("Like or Dislike failed local", e);
  }
}


export const update_post_reaction = async (postId, userId, reactionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const postRef = doc(db, "Posts", postId);

      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw "Document does not exist!";
        }

        const postData = postDoc.data();
        const userReactions = postData.reactions || {}; // { userId: 'like' or 'dislike' }

        let updatedLikes = postData.likes || 0;
        let updatedDislikes = postData.dislikes || 0;

        const currentReaction = userReactions[userId];
        console.log(currentReaction)
        // Remove user's current reaction
        if (currentReaction) {
          if (currentReaction === 'like') {
            updatedLikes -= 1;
          } else if (currentReaction === 'dislike') {
            updatedDislikes -= 1;
          }
        }

        // If the new reaction is the same as the current reaction, remove it
        if (currentReaction === reactionType) {
          delete userReactions[userId];
        } else {
          // Add new reaction
          if (reactionType === 'like') {
            updatedLikes += 1;
          } else if (reactionType === 'dislike') {
            updatedDislikes += 1;
          }

          // Update user reaction
          userReactions[userId] = reactionType;
        }

        // Update post document with new counts and user reactions
        transaction.update(postRef, {
          likes: updatedLikes,
          dislikes: updatedDislikes,
          reactions: userReactions
        });
      });
      resolve(200);
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
      reject(e);
    }
  });
};