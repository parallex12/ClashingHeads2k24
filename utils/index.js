import { Share } from "react-native";

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
