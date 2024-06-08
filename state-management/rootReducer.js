import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { loaderReducer } from './features/screen_loader';
import { expoAppReducer } from './features/firebase_expo_app';
import { postsReducder } from './features/posts';
import { singlePostReducer } from './features/singlePost';
import { searchedUserReducer } from './features/searchedUsers';

const rootReducer = combineReducers({
  auth: authReducer,
  screen_loader: loaderReducer,
  fb_expo_app: expoAppReducer,
  posts: postsReducder,
  singlePost: singlePostReducer,
  searched_users:searchedUserReducer
});

export default rootReducer;
