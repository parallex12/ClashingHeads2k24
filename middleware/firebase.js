import auth from "@react-native-firebase/auth";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  endAt,
  endBefore,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import "firebase/compat/database";

import { validateRequiredFields } from "../utils";
import { useRecoilState } from "recoil";
import { home_posts, user_auth } from "../state-management/atoms/atoms";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { HOME_POSTS, USER_DB_DETAILS } from "../state-management/types/types";
import store from "../state-management/store/store";
import { setNewPostProgress } from "../state-management/features/screen_loader/loaderSlice";
import axios from "axios";
import { create_post } from "../state-management/apiCalls/post";

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
export const getFBAccessToken = async () => {
  try {
    const user = auth().currentUser;
    if (user) {
      const idToken = await user.getIdToken(); // Get the ID token
      return idToken;
    } else {
      console.log("No user is signed in");
      return null;
    }
  } catch (error) {
    console.error("Error getting ID token:", error);
    return null;
  }
};
// Function to get posts with pagination
export const getPaginatedHomePosts = async (lastVisiblePost) => {
  try {
    const db = getFirestore();
    const postsCollection = collection(db, "Posts");

    let q = query(postsCollection, orderBy("createdAt", "desc"), limit(5));

    if (lastVisiblePost) {
      q = query(
        postsCollection,
        orderBy("createdAt", "desc"),
        startAfter(lastVisiblePost),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(q);

    const newposts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastVisiblePost =
      querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      newposts,
      _lastVisiblePost: newLastVisiblePost,
    };
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

export const getHomePosts = async (currentPagePosition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const postsCollection = collection(db, "Posts");
      const q = query(postsCollection, limit(4 * currentPagePosition));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const arr = [];
          snapshot.forEach((doc) => {
            arr.push({ id: doc.id, ...doc.data() });
          });
          resolve(arr);
        },
        (error) => {
          console.log("Error getting documents: ", error);
          reject(error);
        }
      );
      // Log when the listener is first attached
    } catch (e) {
      console.log("Error getting documents: ", error);
      reject(e);
    }
  });
};

export const isUserProfileConnected = async (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let { hasPersonalInfo, hasVoiceAdded, hasProfilePhoto, tos } =
          docSnap?.data();
        if (!tos) {
          resolve({
            code: 200,
            user: docSnap.data(),
            goTo: "CommunityGuidelines",
          });
          return;
        }
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

        resolve({ user: { id: docSnap.id, ...docSnap?.data() } });
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
export const validate_user_details = async (details, user_profile_details) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Initialize Firestore
      const db = getFirestore();

      // Define the required fields for validation
      const requiredFields = ["email", "username", "realName"];

      // Validate required fields
      const validation = validateRequiredFields(details, requiredFields);

      // If validation fails, reject with the appropriate message
      if (!validation.isValid) {
        reject({ msg: validation.msg, field: validation.field });
        return;
      }

      // Determine if email and username checks are required
      const emailCheckRequired =
        !user_profile_details || user_profile_details.email !== details.email;
      const usernameCheckRequired =
        !user_profile_details ||
        user_profile_details.username !== details.username;

      // Create queries for email and username validation if required
      const emailQuery = emailCheckRequired
        ? query(
            collectionGroup(db, "Users"),
            where("email", "==", details.email)
          )
        : null;

      const usernameQuery = usernameCheckRequired
        ? query(
            collectionGroup(db, "Users"),
            where("username", "==", details.username)
          )
        : null;

      // Execute the queries, defaulting to empty results if the query is not required
      const emailSnapshotPromise = emailQuery
        ? getDocs(emailQuery)
        : Promise.resolve({ empty: true });
      const usernameSnapshotPromise = usernameQuery
        ? getDocs(usernameQuery)
        : Promise.resolve({ empty: true });

      // Await the results of both queries
      const [emailSnapshot, usernameSnapshot] = await Promise.all([
        emailSnapshotPromise,
        usernameSnapshotPromise,
      ]);

      // Check the email query results
      if (emailCheckRequired && !emailSnapshot.empty) {
        reject({ msg: "Email already exists", field: "email" });
        return;
      }

      // Check the username query results
      if (usernameCheckRequired && !usernameSnapshot.empty) {
        reject({ msg: "Username already exists", field: "username" });
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

export const addUser = async (userId, userDetails) => {
  return new Promise(async (resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "Users", userId);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        // Update existing user
        await updateDoc(userRef, {
          ...userDetails,
          status: "online", // Set status to 'online' when adding/updating
          lastOnline: new Date().toISOString(),
        });
      } else {
        // Add new user
        await setDoc(userRef, {
          ...userDetails,
          status: "online", // Set status to 'online' for new users
          lastOnline: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.log("Error adding/updating user:", error);
      reject(error);
    }
  });
};

export const update_user_details = async (userId, updatedDetails) => {
  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const userRef = doc(db, "Users", userId);
    updateDoc(userRef, updatedDetails)
      .then(() => {
        resolve({ msg: "User details updated successfully", code: 200 });
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

export const createPost = async (post_details, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();

      let { url } = await uploadMedia(
        post_details?.recording,
        "post_recordings"
      );
      post_details["recording"] = url;

      if (post_details?.post_image) {
        let { url } = await uploadMedia(
          post_details?.post_image,
          "post_images"
        );
        post_details["post_image"] = url;
      }
      await create_post(post_details)
        .then((res) => {
          resolve({
            msg: "Post added successfully",
            post_data: res,
          });
        })
        .catch((error) => {
          console.log("Error adding new post:", error);
          reject(error);
        });
    } catch (e) {
      reject(e);
    }
  });
};

export const createChallengeClash = async (clash_Details, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      let { url } = await uploadMedia(
        clash_Details?.challenger_audio,
        "ChallengeClashesAudios"
      );
      clash_Details["challenger_audio"] = url;

      await addDoc(collection(db, "ChallengeClashes"), clash_Details)
        .then((res) => {
          resolve({
            msg: "Post added successfully",
            post_data: { id: res?.id, ...clash_Details },
          });
        })
        .catch((error) => {
          console.log("Error adding new post:", error);
          reject(error);
        });
    } catch (e) {
      reject(e);
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

export const update_post_reaction_locally = async (
  postData,
  userId,
  reactionType,
  setTempPostData
) => {
  try {
    const userReactions = postData.reactions || {}; // { userId: 'like' or 'dislike' }

    let updatedLikes = postData.likes || 0;
    let updatedDislikes = postData.dislikes || 0;

    const currentReaction = userReactions[userId];
    // Remove user's current reaction
    if (currentReaction) {
      if (currentReaction === "like") {
        updatedLikes -= 1;
      } else if (currentReaction === "dislike") {
        updatedDislikes -= 1;
      }
    }

    // If the new reaction is the same as the current reaction, remove it
    if (currentReaction === reactionType) {
      delete userReactions[userId];
    } else {
      // Add new reaction
      if (reactionType === "like") {
        updatedLikes += 1;
      } else if (reactionType === "dislike") {
        updatedDislikes += 1;
      }

      // Update user reaction
      userReactions[userId] = reactionType;
      setTempPostData((prev) => {
        return {
          ...prev,
          likes: updatedLikes,
          dislikes: updatedDislikes,
          reactions: userReactions,
        };
      });
    }
  } catch (e) {
    console.log("Like or Dislike failed local", e);
  }
};

export const update_post_reaction = async (postId, userId, reactionType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const postRef = doc(db, "Posts", postId);
      const userInteractionsRef = doc(db, "user_interactions", userId);

      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw "Document does not exist!";
        }

        const postData = postDoc.data();
        const userReactions = { ...postData.reactions } || {}; // { userId: 'like' or 'dislike' }

        let updatedLikes = postData.likes || 0;
        let updatedDislikes = postData.dislikes || 0;

        const currentReaction = userReactions[userId];
        // Remove user's current reaction
        if (currentReaction) {
          if (currentReaction === "like") {
            updatedLikes -= 1;
          } else if (currentReaction === "dislike") {
            updatedDislikes -= 1;
          }
        }

        // If the new reaction is the same as the current reaction, remove it
        if (currentReaction === reactionType) {
          delete userReactions[userId];
        } else {
          // Add new reaction
          if (reactionType === "like") {
            updatedLikes += 1;
          } else if (reactionType === "dislike") {
            updatedDislikes += 1;
          }

          // Update user reaction
          userReactions[userId] = reactionType;
        }

        // Update post document with new counts and user reactions
        transaction.update(postRef, {
          likes: updatedLikes,
          dislikes: updatedDislikes,
          reactions: userReactions,
        });
        // Update user interactions document
        transaction.set(
          userInteractionsRef,
          {
            interactions: {
              [postId]: {
                reactionType,
                timestamp: new Date().toISOString(),
              },
            },
          },
          { merge: true }
        );
      });
      resolve(200);
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
      reject(e);
    }
  });
};

export const getRecommendedPosts = async (pageParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      const idToken = await getFBAccessToken();
      console.log(pageParam);
      // Make a GET request to your backend to fetch recommended posts
      await axios
        .get("posts", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          params: {
            cursor: pageParam,
          },
        })
        .then(async (res) => {
          // Extract recommended posts from the response
          const recommendedPosts = res.data;
          // Process the recommended posts as needed
          resolve(recommendedPosts);
        })
        .catch((e) => {
          console.log("getRecommendedPosts", e);
          reject(e);
        });
    } catch (error) {
      // Handle errors
      console.error("Error fetching recommended posts:", error.message);
      reject(error);
    }
  });
};
