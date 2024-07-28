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
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";

const initialState = {
  users: [],
  singleUser: null,
  error: null,
  loading: false,
  clashes: [],
  posts: [],
};

const searchedUsersSlice = createSlice({
  name: "searched",
  initialState,
  reducers: {
    setSearchedUsers(state, action) {
      state.users = action.payload;
    },
    setSearchedClashes(state, action) {
      state.clashes = action.payload;
    },
    setSearchedPosts(state, action) {
      state.posts = action.payload;
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

export const {
  setSearchedUsers,
  setSingleUser,
  setError,
  setLoading,
  setSearchedClashes,
  setSearchedPosts
} = searchedUsersSlice.actions;

export const fetchUsersByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const usersRef = collection(db, "Users");
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // Perform range queries for each field to handle case insensitivity
    const usernameQuery = query(
      usersRef,
      orderBy("username"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );
    const schoolQuery = query(
      usersRef,
      orderBy("school"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );
    const jobQuery = query(
      usersRef,
      orderBy("employment"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );
    const clashHashQuery = query(
      usersRef,
      orderBy("clashHash"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );

    const realNameQuery = query(
      usersRef,
      orderBy("realName"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );

    // Fetch results for each query
    const [
      usernameSnapshot,
      schoolSnapshot,
      jobSnapshot,
      clashHashSnapshot,
      realNameSnapshot,
    ] = await Promise.all([
      getDocs(usernameQuery),
      getDocs(schoolQuery),
      getDocs(jobQuery),
      getDocs(clashHashQuery),
      getDocs(realNameQuery),
    ]);

    console.log(
      realNameSnapshot.size,
      usernameSnapshot.size,
      clashHashSnapshot.size,
      schoolSnapshot.size,
      jobSnapshot.size
    );

    // Combine and deduplicate results
    const usersMap = new Map();
    const addUsersToMap = (snapshot) => {
      snapshot.docs.forEach((doc) => {
        usersMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
    };

    addUsersToMap(usernameSnapshot);
    addUsersToMap(schoolSnapshot);
    addUsersToMap(jobSnapshot);
    addUsersToMap(clashHashSnapshot);
    addUsersToMap(realNameSnapshot);

    const users = Array.from(usersMap.values());

    dispatch(setSearchedUsers(users));
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchPostsByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const postsRef = collection(db, "Posts");
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // Perform range queries for each field to handle case insensitivity
    const titleQuery = query(
      postsRef,
      orderBy("title"),
      startAt(searchQueryLowerCase),
    );

    const descriptionQuery = query(
      postsRef,
      orderBy("description"),
      startAt(searchQueryLowerCase),
    );

    // Fetch results for each query
    const [titleSnapshot, descriptionSnapshot] = await Promise.all([
      getDocs(titleQuery),
      getDocs(descriptionQuery),
    ]);


    // Combine and deduplicate results
    const postsMap = new Map();
    const addPostsToMap = (snapshot) => {
      snapshot.docs.forEach((doc) => {
        postsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
    };

    addPostsToMap(titleSnapshot);
    addPostsToMap(descriptionSnapshot);

    const posts = Array.from(postsMap.values());

    dispatch(setSearchedPosts(posts));
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchClashesByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const db = getFirestore();
    const clashRef = collection(db, "ChallengeClashes");
    const searchQueryLowerCase = searchQuery.toLowerCase();

    // Perform multiple queries for each field
    const titleQuery = query(
      clashRef,
      where("status", "==", "accepted"),
      orderBy("title"),
      startAt(searchQueryLowerCase),
      endAt(searchQueryLowerCase + "\uf8ff")
    );

    // Fetch results for each query
    const [titleSnapshot] = await Promise.all([getDocs(titleQuery)]);

    // Combine and deduplicate results
    const clashesMap = new Map();
    const addClashesToMap = (snapshot) => {
      snapshot.docs.forEach((doc) => {
        clashesMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
    };
    addClashesToMap(titleSnapshot);
    const clashes = Array.from(clashesMap.values());
    dispatch(setSearchedClashes(clashes));
  } catch (error) {
    console.log(error);
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
