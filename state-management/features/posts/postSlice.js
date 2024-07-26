import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
