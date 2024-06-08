// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";

const initialState = {
  users: [],
  error: null,
  loading: false,
};

const searchedUsersSlice = createSlice({
  name: "searched_users",
  initialState,
  reducers: {
    setSearchedUsers(state, action) {
      state.users = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSearchedUsers, setError, setLoading } = searchedUsersSlice.actions;

export const fetchUsersByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const usersRef = collection(db, "Users");
    const q = query(
      usersRef,
      where("username", ">=", searchQuery),
      where("username", "<=", searchQuery + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(searchQuery, users)

    dispatch(setSearchedUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default searchedUsersSlice.reducer;
