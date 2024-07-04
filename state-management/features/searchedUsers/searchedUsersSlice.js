// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const initialState = {
  users: [],
  singleUser: null,
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
    setSingleUser(state, action) {
      state.singleUser = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSearchedUsers, setSingleUser, setError, setLoading } =
  searchedUsersSlice.actions;

export const fetchUsersByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("username", ">=", searchQuery));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    dispatch(setSearchedUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserById = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const userDoc = doc(db, "Users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      dispatch(setSingleUser({ id: userSnapshot.id, ...userSnapshot.data() }));
    } else {
      dispatch(setError("User not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchInstantUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, "Users", userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        resolve({ id: userSnapshot.id, ...userSnapshot.data() });
      } else {
        reject("User not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default searchedUsersSlice.reducer;
