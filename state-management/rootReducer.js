import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth";
import { loaderReducer } from "./features/screen_loader";
import { expoAppReducer } from "./features/firebase_expo_app";
import { postsReducder } from "./features/posts";
import { singlePostReducer } from "./features/singlePost";
import { searchedUserReducer } from "./features/searchedUsers";
import { challengeClashReducer } from "./features/challengeClash";
import { allChallengeClashesReducer } from "./features/allChallengeClashes";
import { challengeRequestReducer } from "./features/challengeRequests";
import { RESET } from "./types/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bottom_menuReducer } from "./features/bottom_menu";

const rootReducer = combineReducers({
  auth: authReducer,
  screen_loader: loaderReducer,
  fb_expo_app: expoAppReducer,
  posts: postsReducder,
  singlePost: singlePostReducer,
  searched_users: searchedUserReducer,
  challengeClash: challengeClashReducer,
  challengeClashes: allChallengeClashesReducer,
  challengeRequests:challengeRequestReducer,
  bottom_menu:bottom_menuReducer,
});

export default rootReducer;