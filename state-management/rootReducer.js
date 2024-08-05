import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { loaderReducer } from "./features/screen_loader";
import { bottom_menuReducer } from "./features/bottom_menu";
import presenceReducer from "./features/auth/presenceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  screen_loader: loaderReducer,
  bottom_menu: bottom_menuReducer,
  presence: presenceReducer,
});

export default rootReducer;
