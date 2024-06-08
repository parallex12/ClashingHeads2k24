// challengeClashSlice.js

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
  challengeClash: null,
  subClashes: [],
  loading: false,
  error: null,
};

const challengeClashSlice = createSlice({
  name: "challengeClash",
  initialState,
  reducers: {
    setChallengeClash(state, action) {
      state.challengeClash = action.payload;
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
    addSubClash(state, action) {
      state.subClashes.push(action.payload);
    },
    updateSubClash(state, action) {
      const { subClashId, updatedFields } = action.payload;
      const subClashIndex = state.subClashes?.findIndex(
        (subClash) => subClash.id === subClashId
      );
      if (subClashIndex !== -1) {
        state.subClashes[subClashIndex] = {
          ...state.subClashes[subClashIndex],
          ...updatedFields,
        };
      }
    },
    updateChallengeClashDetails(state, action) {
      state.challengeClash = {
        ...state.challengeClash,
        ...action.payload,
      };
    },
  },
});

export const {
  setChallengeClash,
  setSubClashes,
  setLoading,
  setError,
  addSubClash,
  updateSubClash,
  updateChallengeClashDetails,
} = challengeClashSlice.actions;

export const fetchChallengeClashAndSubClashes = (clashId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const clashRef = doc(db, "ChallengeClashes", clashId);
    const unsubscribeClash = onSnapshot(clashRef, (doc) => {
      if (doc.exists()) {
        dispatch(setChallengeClash({ id: doc.id, ...doc.data() }));
      } else {
        dispatch(setChallengeClash(null));
      }
    });
    const subClashesRef = collection(db, "ChallengeClashes", clashId, "SubClashes");
    const unsubscribeSubClashes = onSnapshot(subClashesRef, (snapshot) => {
      const subClashes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setSubClashes(sortPostsByCreatedAt(subClashes)));
    });
    // Clean up subscriptions
    return () => {
      unsubscribeClash();
      unsubscribeSubClashes();
    };
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addSubClashToChallenge = (clashId, subClashData) => async (dispatch) => {
    try {
      dispatch(addSubClash({ ...subClashData }));
      const db = getFirestore();
      const subClashesRef = doc(db, "ChallengeClashes", clashId, "SubClashes",subClashData?.id);
      const docRef = await setDoc(subClashesRef, subClashData);
      if (subClashData?.recording && subClashData?.clashType == "mic") {
        await uploadMedia(subClashData?.recording, "clashesAudios")
          .then(async (res) => {
            if (res?.url) {
              subClashData["recording"] = res?.url;
              await setDoc(docRef, subClashData);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await setDoc(docRef, subClashData);
      }
    } catch (error) {
      console.error("Error adding sub-clash:", error);
    }
  };
  

export const updateChallengeClash = (clashId, updatedFields) => async (dispatch) => {
  try {
    const db = getFirestore();
    const clashRef = doc(db, "ChallengeClashes", clashId);
    await updateDoc(clashRef, updatedFields);
    dispatch(updateChallengeClashDetails(updatedFields));
  } catch (error) {
    console.error("Error updating challenge clash details:", error);
    dispatch(setError(error.message));
  }
};

export const updateSubClashDetails =
  (clashId, subClashId, updatedFields) => async (dispatch) => {
    try {
      const db = getFirestore();
      const subClashRef = doc(db, "ChallengeClashes", clashId, "SubClashes", subClashId);
      await updateDoc(subClashRef, updatedFields);
      dispatch(updateSubClash({ subClashId, updatedFields }));
    } catch (error) {
      console.error("Error updating sub-clash details:", error);
    }
  };

export const updateSubClashReaction =
  (subClash, userId, reactionType) => async (dispatch, getState) => {
    try {
      if (!subClash) throw new Error("Sub-clash not found");

      const userReactions = { ...subClash.reactions } || {};
      let updatedLikes = subClash.likes || 0;
      let updatedDislikes = subClash.dislikes || 0;
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

      dispatch(updateSubClash({ subClashId: subClash?.id, updatedFields }));
      const db = getFirestore();
      const subClashRef = doc(db, "ChallengeClashes", subClash?.challengeClashId, "SubClashes", subClash?.id);
      await updateDoc(subClashRef, updatedFields);
    } catch (error) {
      console.error("Error updating sub-clash reaction:", error);
    }
  };

export default challengeClashSlice.reducer;
