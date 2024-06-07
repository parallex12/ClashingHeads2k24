// singlePostSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { doc, getFirestore, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { uploadMedia } from '../../../middleware/firebase';
import { sortPostsByCreatedAt } from '../../../utils';

const initialState = {
  post: null,
  subClashes: [],
  loading: false,
  error: null,
};

const singlePostSlice = createSlice({
  name: 'singlePost',
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
      const clashIndex = state.subClashes?.findIndex(clash => clash.id === clashId);
      if (clashIndex !== -1) {
        state.subClashes[clashIndex] = {
          ...state.subClashes[clashIndex],
          ...updatedFields,
        };
      }
    },
  },
});

export const { setPost, setSubClashes, setLoading, setError, addClash, updateClash } = singlePostSlice.actions;

export const fetchSinglePostAndClashes = (postId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const postRef = doc(db, 'Posts', postId);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        dispatch(setPost({ id: doc.id, ...doc.data() }));
      } else {
        dispatch(setPost(null));
      }
    });
    const clashesRef = collection(db, 'Posts', postId, 'Clashes');
    const unsubscribeClashes = onSnapshot(clashesRef, (snapshot) => {
      const subClashes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    const clashesRef = collection(db, 'Posts', postId, 'Clashes');
    if (clashData?.recording && clashData?.clashType == "mic") {
      await uploadMedia(clashData?.recording, "clashesAudios")
        .then(async (res) => {
          if (res?.url) {
            clashData["recording"] = res?.url
            console.log(clashData)
            await addDoc(clashesRef, clashData)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const newClashRef = await addDoc(clashesRef, clashData);
    }
  } catch (error) {
    console.error('Error adding clash:', error);
  }
};


export const updateClashDetails = (postId, clashId, updatedFields) => async (dispatch) => {
  try {
    dispatch(updateClash({ clashId, updatedFields }));
    const db = getFirestore();
    const clashRef = doc(db, 'Posts', postId, 'Clashes', clashId);
    await updateDoc(clashRef, updatedFields);
    // Dispatch an action to update the Redux state
  } catch (error) {
    console.error('Error updating clash details:', error);
  }
};

export default singlePostSlice.reducer;
