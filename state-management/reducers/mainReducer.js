import { notificationSettingsOptions, privacySettingsOptions } from "../../utils";
import { FIREBASE_EXPO_APP, HOME_POSTS, ISVOICEMODALOPEN, NOTIFICATIONS_SETTINGS_OPTIONS, OTPCONFIRMATION, REGISTRATIONFORM, SCREEN_LOADER, USER_AUTH, USER_DB_DETAILS } from "../types/types";
const initialState = {
  registration_form: null,
  otp_confirmation: null,
  user_auth: null,
  screen_loader: "default",
  user_db_details: null,
  privacy_settings_options: privacySettingsOptions,
  notifications_settings_options: notificationSettingsOptions,
  is_voice_modal_open: null,
  home_posts: null,
  firebase_expo_app: null,
};


const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATIONFORM:
      return {
        ...state,
        registration_form: action.payload,
      };
    case OTPCONFIRMATION:
      return {
        ...state,
        otp_confirmation: action.payload,
      };

    case USER_AUTH:
      return {
        ...state,
        user_auth: action.payload,
      };

    case SCREEN_LOADER:
      return {
        ...state,
        screen_loader: action.payload,
      };

    case USER_DB_DETAILS:
      return {
        ...state,
        user_db_details: action.payload,
      };
    case privacySettingsOptions:
      return {
        ...state,
        privacy_settings_options: action.payload,
      };

    case NOTIFICATIONS_SETTINGS_OPTIONS:
      return {
        ...state,
        notifications_settings_options: action.payload,
      };
    case ISVOICEMODALOPEN:
      return {
        ...state,
        is_voice_modal_open: action.payload,
      };

    case HOME_POSTS:
      return {
        ...state,
        home_posts: action.payload,
      };

    case FIREBASE_EXPO_APP:
      return {
        ...state,
        firebase_expo_app: action.payload,
      };
    default:
      return state;
  }
};
export default mainReducer;
