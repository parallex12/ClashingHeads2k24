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
  getDocs 
} from "firebase/firestore";
import { uploadMedia } from "../../../middleware/firebase";
import { sortPostsByCreatedAt } from "../../../utils";

const initialState = {
  challengeRequest: null,
  allRequests: [],
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
      const requestIndex = state.allRequests.findIndex((request) => request.id === requestId);
      if (requestIndex !== -1) {
        state.allRequests[requestIndex] = { ...state.allRequests[requestIndex], ...updatedFields };
      }
    },
    deleteChallengeRequest(state, action) {
      state.allRequests = state.allRequests.filter((request) => request.id !== action.payload);
    },
  },
});

export const {
  setChallengeRequest,
  setAllRequests,
  setLoading,
  setError,
  addChallengeRequest,
  updateChallengeRequest,
  deleteChallengeRequest,
} = challengeRequestsSlice.actions;

export const fetchAllChallengeRequests = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const requestsQuery = query(collection(db, "ChallengeRequests"), where("opponent", "==", userId));
    const querySnapshot = await getDocs(requestsQuery);
    const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setAllRequests(sortPostsByCreatedAt(requests)));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addChallengeRequestForUser = (userId, requestData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    requestData.opponent = userId; // Ensure the opponent field is set to the current user ID
    const docRef = await addDoc(collection(db, "ChallengeRequests"), requestData);
    dispatch(addChallengeRequest({ id: docRef.id, ...requestData }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateChallengeRequestForUser = (requestId, updatedFields) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const requestRef = doc(db, "ChallengeRequests", requestId);
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
    const requestRef = doc(db, "ChallengeRequests", requestId);
    await deleteDoc(requestRef);
    dispatch(deleteChallengeRequest(requestId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default challengeRequestsSlice.reducer;
