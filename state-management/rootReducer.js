import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { loaderReducer } from './features/screen_loader';
import { expoAppReducer } from './features/firebase_expo_app';

const rootReducer = combineReducers({
  auth: authReducer,
  screen_loader: loaderReducer,
  fb_expo_app: expoAppReducer
});

export default rootReducer;
