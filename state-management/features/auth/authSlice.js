import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const initialState = {
  user: null,
  loading: false,
  error: null,
  otp_confirm: null,
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
      return { ...state, isAuth: false, user: null };
    },
    confirmOtp: (state, action) => {
      return { ...state, otp_confirm: action.payload };
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
  confirmOtp,
  setUserDetails,
  loginFailure,
  logout,
  setUserForm,
} = authSlice.actions;

export const fetchCurrentUserDetails = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const db = getFirestore();
    const userDoc = doc(db, "Users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      dispatch(
        setUserDetails({ id: userSnapshot?.id, ...userSnapshot.data() })
      );
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
