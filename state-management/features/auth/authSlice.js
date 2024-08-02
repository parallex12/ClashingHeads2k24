import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const initialState = {
  user: {},
  loading: false,
  error: null,
  isAuth: false,
  userForm: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return { ...state, isAuth: true };
    },
    loginFailure: (state, action) => {
      return { ...state, error: action.payload };
    },
    logout: (state) => {
      return { ...state, isAuth: false, user: {}, userForm: {} };
    },
    setUserForm: (state, action) => {
      return { ...state, userForm: action.payload };
    },
    setUserDetails: (state, action) => {
      return { ...state, user: action.payload };
    },
  },
});

export const {
  loginSuccess,
  setUserDetails,
  loginFailure,
  logout,
  setUserForm,
} = authSlice.actions;

export const fetchCurrentUserDetails = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await axios.post(`/users/${userId}`);
    if (result.data) {
      dispatch(setUserDetails(result.data));
    } else {
      dispatch(setError("User not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
