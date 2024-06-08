// singlePostSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { uploadMedia } from "../../../middleware/firebase";
import { sortPostsByCreatedAt } from "../../../utils";

const initialState = {
  post: null,
  subClashes: [],
  loading: false,
  error: null,
};

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {
    setPost(state, action) {
      state.post = action.payload;
    },
    setSubClashes(state, action) {
      state.subClashes = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addClash(state, action) {
      state.subClashes.push(action.payload);
    },
    updateClash(state, action) {
      const { clashId, updatedFields } = action.payload;
      const clashIndex = state.subClashes?.findIndex(
        (clash) => clash.id === clashId
      );
      if (clashIndex !== -1) {
        state.subClashes[clashIndex] = {
          ...state.subClashes[clashIndex],
          ...updatedFields,
        };
      }
    },
    updatePostDetails(state, action) {
      state.post = {
        ...state.post,
        ...action.payload,
      };
    },
  },
});

export const {
  setPost,
  setSubClashes,
  setLoading,
  setError,
  addClash,
  updateClash,
  updatePostDetails,
} = singlePostSlice.actions;

export const fetchSinglePostAndClashes = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const postRef = doc(db, "Posts", postId);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        dispatch(setPost({ id: doc.id, ...doc.data() }));
      } else {
        dispatch(setPost(null));
      }
    });
    const clashesRef = collection(db, "Posts", postId, "Clashes");
    const unsubscribeClashes = onSnapshot(clashesRef, (snapshot) => {
      const subClashes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setSubClashes(sortPostsByCreatedAt(subClashes)));
    });
    // Clean up subscriptions
    return () => {
      unsubscribePost();
      unsubscribeClashes();
    };
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export function generateUniqueId() {
  const timestamp = new Date().getTime(); // Get current timestamp
  const random = Math.random() * 1000000; // Generate random number
  const uniqueId = `${timestamp}-${random}`; // Combine timestamp and random number
  return uniqueId;
}

export const addClashToPost = (postId, clashData) => async (dispatch) => {
  try {
    dispatch(addClash({ ...clashData }));
    const db = getFirestore();
    const clashesRef = doc(db, "Posts", postId, "Clashes", clashData?.id);
    if (clashData?.recording && clashData?.clashType == "mic") {
      await uploadMedia(clashData?.recording, "clashesAudios")
        .then(async (res) => {
          if (res?.url) {
            clashData["recording"] = res?.url;
            console.log(clashData);
            await setDoc(clashesRef, clashData);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await setDoc(clashesRef, clashData);
    }
  } catch (error) {
    console.error("Error adding clash:", error);
  }
};

export const updatePost = (postId, updatedFields) => async (dispatch) => {
  try {
    const db = getFirestore();
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, updatedFields);
    dispatch(updatePostDetails(updatedFields));
  } catch (error) {
    console.error("Error updating post details:", error);
    dispatch(setError(error.message));
  }
};

export const updateClashDetails =
  (postId, clashId, updatedFields) => async (dispatch) => {
    try {
      // dispatch(updateClash({ clashId, updatedFields }));
      const db = getFirestore();
      const clashRef = doc(db, "Posts", postId, "Clashes", clashId);
      await updateDoc(clashRef, updatedFields);
      // Dispatch an action to update the Redux state
    } catch (error) {
      console.error("Error updating clash details:", error);
    }
  };

export const updateClashReaction =
  (clash, userId, reactionType) => async (dispatch, getState) => {
    try {
      if (!clash) throw new Error("Clash not found");

      const userReactions = { ...clash.reactions } || {};
      let updatedLikes = clash.likes || 0;
      let updatedDislikes = clash.dislikes || 0;
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

      const updatedFields = {
        likes: updatedLikes,
        dislikes: updatedDislikes,
        reactions: userReactions,
      };

      dispatch(updateClash({ id: clash?.id, updatedFields }));
      const db = getFirestore();
      const clashRef = doc(db, "Posts", clash?.postId, "Clashes", clash?.id);
      await updateDoc(clashRef, updatedFields);
    } catch (error) {
      console.error("Error updating clash reaction:", error);
    }
  };

export default singlePostSlice.reducer;
