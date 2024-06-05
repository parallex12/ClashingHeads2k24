import { Share } from "react-native";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";
// import { getAuth } from "firebase/auth";
import { setAuthToken } from "../middleware";

export const EmojisArr = [
  {
    key: "cry",
    icon: require("../assets/recordEmoji/cry.png"),
  },
  {
    key: "fear",
    icon: require("../assets/recordEmoji/fear.png"),
  },
  {
    key: "laugh",
    icon: require("../assets/recordEmoji/laugh.png"),
  },
  {
    key: "shock",
    icon: require("../assets/recordEmoji/shock.png"),
  },
  {
    key: "sleep",
    icon: require("../assets/recordEmoji/sleep.png"),
  },
  {
    key: "sneez",
    icon: require("../assets/recordEmoji/sneez.png"),
  },
];

// Function to format duration in "mm:ss" format
export function formatDuration(durationString) {
  // Parse the duration string as an integer
  const durationMillis = parseInt(durationString);

  // Calculate total seconds
  const totalSeconds = Math.floor(durationMillis / 1000);

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Format minutes and seconds with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const onShareApp = async () => {
  try {
    const result = await Share.share({
      message: "Clashing Heads",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const settingOptions = [
  {
    route: "EditPersonalInformation",
    label: "Personal Information",
    icon: require("../assets/icons/settings/profile.png"),
  },
  {
    route: "SecuritySettings",
    label: "Security",
    icon: require("../assets/icons/settings/security.png"),
  },
  {
    route: null,
    label: "Location",
    icon: require("../assets/icons/settings/location.png"),
  },
  {
    route: "PrivacySettings",
    label: "Privacy",
    icon: require("../assets/icons/settings/lock.png"),
  },
  {
    route: "NotificationSettings",
    label: "Notifications",
    icon: require("../assets/icons/settings/notification.png"),
  },
  {
    route: "HelpAndSupport",
    label: "Help & Support",
    icon: require("../assets/icons/settings/help.png"),
  },
];

export const notificationSettingsOptions = [
  {
    key: "daily_weekly_clash_notification",
    label: "Daily / Weekly Clash notification",
    isEnabled: false,
  },
  {
    key: "tagged_comments_notification",
    label: "Tagged comments notification",
    isEnabled: false,
  },
  {
    key: "calendar_notifications",
    label: "Calendar Notifications",
    isEnabled: false,
  },
  {
    key: "notify_when_fill_in_clash",
    label: "Notify me when [FILL-IN] is in a Clash",
    isEnabled: false,
  },
  {
    key: "notify_when_followers_clash",
    label: "Notify me when my followers are in a Clash",
    isEnabled: false,
  },
  {
    key: "notify_when_following_clasher_clash",
    label: "Notify me when a Clasher I’m following is in a Clash",
    isEnabled: false,
  },
  {
    key: "notify_when_celebrity_clash",
    label: "Notify me when a celebrity is in a Clash",
    isEnabled: false,
  },
  {
    key: "notify_volunteer_opportunities",
    label: "Notify me of volunteer opportunities for Clashing Heads",
    isEnabled: false,
  },
  {
    key: "notify_promotions_announcements",
    label: "Notify me of promotions or announcements from Clashing Heads",
    isEnabled: false,
  },
];

export const privacySettingsOptions = [
  {
    key: "allow_advertising",
    label: "Allow advertising and promotions popups",
    isEnabled: true,
  },
  {
    key: "allow_contact_non_marketing",
    label: "Allow Clashing Heads to contact me for non-marketing purposes",
    isEnabled: true,
  },
  {
    key: "allow_send_advertising",
    label: "Allow Clashing Heads to send me advertising and promotions offers",
    isEnabled: true,
  },
  {
    key: "contact_via_email",
    label: "Clashing Heads should contact me via email",
    isEnabled: true,
  },
  {
    key: "contact_via_sms",
    label:
      "Clashing Heads should contact me via SMS. Third-party data rates may apply",
    isEnabled: true,
  },
  {
    key: "allow_sale_of_user_information",
    label:
      "Allow sale of my user information and identity information to third-party marketers",
    isEnabled: true,
  },
  {
    key: "allow_use_of_image_voice",
    label:
      "Allow use of my image / voice / Clashes in Clashing Heads marketing promotions without compensation as long as I am notified ahead of time by email on file",
    isEnabled: true,
  },
  {
    key: "show_real_name_in_public",
    label: "Show my real name in public",
    isEnabled: true,
  },
  {
    key: "show_political_tag_in_public",
    label: "Show my political tag in public",
    isEnabled: true,
  },
  {
    key: "allow_view_followers_following",
    label:
      "Allow any Clasher to view who I am following and who is following me",
    isEnabled: true,
  },
];

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export const _setToken = () => {
  try {
    const auth = null
    const user = auth.currentUser;
    setAuthToken(user?.accessToken);
  } catch (e) {
    console.log(e.message);
  }
};


export const validateRequiredFields = (details, requiredFields) => {
  for (const field of requiredFields) {
    if (!details[field]) {
      return { isValid: false, msg: `${field} is required`, field };
    }
  }
  return { isValid: true };
};

export function getTimeElapsed(createdAt) {
  const now = new Date();
  if (!createdAt) return "0min"
  const createdAtDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);

  const timeDifference = now - createdAtDate; // time difference in milliseconds

  // Calculate the differences in various units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the time elapsed in a readable format
  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return `${seconds}s`;
  }
}

export function sortPostsByCreatedAt(posts) {
  return posts.sort((a, b) => {
    const aDate = new Date(a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000);
    const bDate = new Date(b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000);
    return bDate - aDate; // Sort in descending order (most recent first)
  });
}

