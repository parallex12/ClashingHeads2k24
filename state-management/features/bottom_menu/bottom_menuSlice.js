import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItem: "Home",
  isSideMenuOpen: "closed",
  currentActiveScreen: "Home",
};

const bottom_menuSlice = createSlice({
  name: "bottom_menu",
  initialState,
  reducers: {
    onMenuPress: (state, action) => {
      return { ...state, menuItem: action.payload };
    },
    onUpdateMenu: (state, action) => {
      return { ...state, isSideMenuOpen: action.payload };
    },
    onScreenChange: (state, action) => {
      return { ...state, currentActiveScreen: action.payload };
    },
  },
});

export const { onMenuPress, onUpdateMenu,onScreenChange } = bottom_menuSlice.actions;
export default bottom_menuSlice.reducer;
