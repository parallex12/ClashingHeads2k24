import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "default",
};

const loaderSlice = createSlice({
  name: "screen_loader",
  initialState,
  reducers: {
    startLoading: (state, action) => {
      return { ...state, loading: true };
    },
    stopLoading: (state, action) => {
      return { ...state, loading: false };
    },
    
  },
});

export const { startLoading, stopLoading, } = loaderSlice.actions;
export default loaderSlice.reducer;
