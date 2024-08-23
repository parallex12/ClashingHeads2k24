import { combineReducers } from "@reduxjs/toolkit";
import { loaderReducer } from "./features/screen_loader";
import { bottom_menuReducer } from "./features/bottom_menu";

const rootReducer = combineReducers({
  screen_loader: loaderReducer,
  bottom_menu: bottom_menuReducer,
});

export default rootReducer;
