import { createSlice } from "@reduxjs/toolkit";
import {
  doc,
  getFirestore,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { uploadMedia } from "../../../middleware/firebase";
import { sortPostsByCreatedAt } from "../../../utils";
import { stopLoading } from "../screen_loader/loaderSlice";

const initialState = {
  challengeRequest: null,
  allRequests: [],
  posts: [],
  loading: false,
  error: null,
};

const challengeRequestsSlice = createSlice({
  name: "challengeRequests",
  initialState,
  reducers: {
    setChallengeRequest(state, action) {
      state.challengeRequest = action.payload;
    },
    setAllRequests(state, action) {
      state.allRequests = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addChallengeRequest(state, action) {
      state.allRequests.push(action.payload);
    },
    updateChallengeRequest(state, action) {
      const { requestId, updatedFields } = action.payload;
      const requestIndex = state.allRequests.findIndex(
        (request) => request.id === requestId
      );
      if (requestIndex !== -1) {
        state.allRequests[requestIndex] = {
          ...state.allRequests[requestIndex],
          ...updatedFields,
        };
      }
    },
    deleteChallengeRequest(state, action) {
      state.allRequests = state.allRequests.filter(
        (request) => request.id !== action.payload
      );
    },
   
  },
});

export const {
  setChallengeRequest,
  setAllRequests,
  setPosts,
  setLoading,
  setError,
  addChallengeRequest,
  updateChallengeRequest,
  deleteChallengeRequest,
} = challengeRequestsSlice.actions;

export const fetchUserPostsAndChallenges = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();

    // Fetch user's posts
    const postsQuery = query(
      collection(db, "Posts"),
      where("author.id", "==", userId)
    );
    const postsSnapshot = await getDocs(postsQuery);
    const userPosts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch user's challenges as opponent
    const opponentQuery = query(
      collection(db, "ChallengeClashes"),
      where("opponentId", "==", userId)
    );
    const opponentSnapshot = await getDocs(opponentQuery);
    const opponentChallenges = opponentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch user's challenges as challenger
    const challengerQuery = query(
      collection(db, "ChallengeClashes"),
      where("challengerId", "==", userId)
    );
    const challengerSnapshot = await getDocs(challengerQuery);
    const challengerChallenges = challengerSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Combine all challenges
    const combinedChallenges = [...opponentChallenges, ...challengerChallenges];

    // Dispatch posts and challenges to the store
    dispatch(setPosts(sortPostsByCreatedAt(userPosts)));
    dispatch(setAllRequests(sortPostsByCreatedAt(combinedChallenges)));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addChallengeRequestForUser = (userId, requestData) => async (dispatch) => {
  try {
    const db = getFirestore();
    requestData.opponent = userId; // Ensure the opponent field is set to the current user ID
    const docRef = await addDoc(collection(db, "ChallengeClashes"), requestData);
    dispatch(addChallengeRequest({ id: docRef.id, ...requestData }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(stopLoading(false));
    alert("Challenge request has been sent")
  }
};
export const updateChallengeRequestForUser = (requestId, updatedFields) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const requestRef = doc(db, "ChallengeClashes", requestId);
    await updateDoc(requestRef, updatedFields);
    dispatch(updateChallengeRequest({ requestId, updatedFields }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
export const deleteChallengeRequestForUser = (requestId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const requestRef = doc(db, "ChallengeClashes", requestId);
    await deleteDoc(requestRef);
    dispatch(deleteChallengeRequest(requestId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default challengeRequestsSlice.reducer;
