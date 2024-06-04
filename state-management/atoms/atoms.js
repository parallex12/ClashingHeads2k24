// atoms.js
import auth from "@react-native-firebase/auth";
import { atom } from "recoil";

import {
  notificationSettingsOptions,
  privacySettingsOptions,
} from "../../utils";
import { getHomePosts } from "../../middleware/firebase";

export const registrationForm = atom({
  key: "registrationForm",
  default: { id: auth().currentUser?.uid },
});


export const otpConfirmation = atom({
  key: "otpConfirmation",
  default: null,
});

export const user_auth = atom({
  key: "user_auth",
  default: auth().currentUser,
});

export const screen_loader = atom({
  key: "screen_loader",
  default: "default",
});

export const user_db_details = atom({
  key: "user_db_details",
  default: null,
});

export const privacySettingsOptions_atom = atom({
  key: "privacySettingsOptions_atom",
  default: privacySettingsOptions,
});

export const notificationSettingsOptions_atom = atom({
  key: "notificationSettingsOptions_atom",
  default: notificationSettingsOptions,
});

export const isVoiceModalOpen_Recoil = atom({
  key: "isVoiceModalOpen",
  default: false,
});

export const home_posts = atom({
  key: "home_posts",
  default: null
});


export const firebase_expo_app_initialize = atom({
  key: "firebase_expo_app_initialize",
  default: null
});
