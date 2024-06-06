import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  otp_confirm: null,
  isAuth: false,
  userForm: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return { ...state, isAuth: true }
    },
    loginFailure: (state, action) => {
      return { ...state, error: action.payload, }
    },
    logout: (state) => {
      return { ...state, isAuth: false, user: null }
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

export const { loginSuccess, confirmOtp, setUserDetails, loginFailure, logout, setUserForm } = authSlice.actions;

export default authSlice.reducer;
