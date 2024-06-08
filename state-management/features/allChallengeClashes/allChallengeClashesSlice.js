import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";

// Constants for pagination
const PAGE_SIZE = 2;

// Async thunk to fetch all challenge clashes with pagination
export const fetchAllChallengeClashes = createAsyncThunk(
  "challengeClashes/fetchAll",
  async ({ lastVisible }) => {
    const db = getFirestore();
    let q = query(
      collection(db, "ChallengeClashes"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    if (lastVisible) {
      q = query(q, startAfter(JSON.parse(lastVisible)));
    }

    const snapshot = await getDocs(q);
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const clashes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { clashes, lastVisible:JSON.stringify(lastDoc) };
  }
);

const allChallengeClashesSlice = createSlice({
  name: "challengeClashes",
  initialState: {
    clashes: [],
    lastVisible: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChallengeClashes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllChallengeClashes.fulfilled, (state, action) => {
        state.loading = false;
        state.clashes = [...state.clashes, ...action.payload.clashes];
        state.lastVisible = action.payload.lastVisible;
      })
      .addCase(fetchAllChallengeClashes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allChallengeClashesSlice.reducer;
