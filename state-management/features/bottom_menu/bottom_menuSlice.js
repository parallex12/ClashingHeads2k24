import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItem: "Home",
  isSideMenuOpen: "closed",
  isBottomSheetOpen: -1,
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
    onUpdateBottomSheet: (state, action) => {
      return { ...state, isBottomSheetOpen: action.payload };
    },
    onScreenChange: (state, action) => {
      return { ...state, currentActiveScreen: action.payload };
    },
  },
});

export const { onMenuPress, onUpdateMenu,onScreenChange,onUpdateBottomSheet } = bottom_menuSlice.actions;
export default bottom_menuSlice.reducer;
