import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  where,
} from "firebase/firestore";

// Constants for pagination
const PAGE_SIZE = 2;

// Async thunk to fetch all challenge clashes with pagination
export const fetchAllChallengeClashes = createAsyncThunk(
  "challengeClashes/fetchAll",
  async () => {
    const db = getFirestore();
    let q = query(
      collection(db, "ChallengeClashes"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);
    const clashes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { clashes };
  }
);

const allChallengeClashesSlice = createSlice({
  name: "challengeClashes",
  initialState: {
    clashes: [],
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
        state.clashes = [...action.payload.clashes];
      })
      .addCase(fetchAllChallengeClashes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default allChallengeClashesSlice.reducer;
