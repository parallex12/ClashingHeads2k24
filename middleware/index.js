import { useWindowDimensions } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { RFValue as rf } from "react-native-responsive-fontsize";
export const FontsConfig = {
  Light: require("../assets/fonts/SF-Pro-Text-Light.otf"),
  Regular: require("../assets/fonts/SF-Pro-Text-Regular.otf"),
  Medium: require("../assets/fonts/SF-Pro-Text-Medium.otf"),
  Semibold: require("../assets/fonts/SF-Pro-Text-Semibold.otf"),
  Bold: require("../assets/fonts/SF-Pro-Text-Bold.otf"),
  Heavy: require("../assets/fonts/SF-Pro-Text-Heavy.otf"),
};

export const get12FormatTime = (time) => {
  const timeString12hr = new Date(
    "1970-01-01T" + time + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return timeString12hr;
};

export const MenuItems = [
  {
    icon: "addPath",
    Title: "Demo",
  },
];

export const getDimension = () => {
  let { width, height } = useWindowDimensions();
  return { width, height };
};

export const getPercent = (percent, total) => {
  return (percent / 100) * total;
};

export const Calendar = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
};

export const toSeconds = (hours, minutes, seconds) => {
  return hours * 3600 + minutes * 60 + seconds;
};

export const toHMS = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
};

export const toHMS_OBJ = (seconds) => {
  let time = new Date(seconds * 1000).toISOString().slice(11, 19);
  let newObj = time.split(":");
  return { hours: newObj[0], minutes: newObj[1], seconds: newObj[2] };
};

export const registrationFields = [
  {
    title: "Real Name",
    key: "realName",
    placeholder: "Enter your full name here",
    type: "text",
  },
  {
    title: "Create Username",
    key: "username",
    placeholder: "Enter username here",
    type: "text",
  },
  {
    title: "Email Address",
    key: "email",
    placeholder: "Enter your email address",
    type: "text",
  },
  {
    title: "Date of Birth",
    key: "dateOfBirth",
    placeholder: "Select",
    icon: <Ionicons name="calendar-outline" size={rf(15)} color="#6B7280" />,
    type: "date",
  },
  {
    title: "Your Politics",
    key: "politics",
    placeholder: "Select",
    type: "picker",
    icon: <Entypo name="chevron-thin-down" size={rf(12)} color="#6B7280" />,
  },
];

export const politicsCategory = [
  {
    title: "Left Winger",
    key: "Leftwinger",
  },
  {
    title: "Right Winger",
    key: "Rightwinger",
  },
  {
    title: "Trump Winger",
    key: "Trumpwinger",
  },
  {
    title: "Middle Winger",
    key: "Middlewinger",
  },
  {
    title: "No Winger",
    key: "Nowinger",
  },
  {
    title: "Prefer not to disclose",
    key: "Prefernotto disclose",
  },
];