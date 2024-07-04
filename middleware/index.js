import { useWindowDimensions } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { RFValue as rf } from "react-native-responsive-fontsize";
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { FontAwesome6, FontAwesome5, Fontisto } from "@expo/vector-icons";

export const FontsConfig = {
  Light: require("../assets/fonts/SF-Pro-Text-Light.otf"),
  Regular: require("../assets/fonts/SF-Pro-Text-Regular.otf"),
  Medium: require("../assets/fonts/SF-Pro-Text-Medium.otf"),
  Semibold: require("../assets/fonts/SF-Pro-Text-Semibold.otf"),
  Bold: require("../assets/fonts/SF-Pro-Text-Bold.otf"),
  Heavy: require("../assets/fonts/SF-Pro-Text-Heavy.otf"),
  BLP: require("../assets/fonts/BertramLETPlain.ttf"),
};


export const postprivacyoptions = [
  {
    label: "Public",
    icon: <FontAwesome6 name="earth-americas" size={16} color="#6B7280" />,
    active: false,
    key: 0,
  },
  {
    label: "Friends",
    icon: <FontAwesome5 name="users" size={16} color="#6B7280" />,
    active: false,
    key: 1,
  },
  {
    label: "Only me",
    icon: <FontAwesome6 name="lock" size={16} color="#6B7280" />,
    active: false,
    key: 2,
  },
];
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

export const bioFields = [
  {
    title: "Bio",
    key: "bio",
    placeholder: "Write a brief description about yourself.",
    type: "text",
  },
  {
    title: "Add School / College",
    key: "school",
    placeholder: "Enter the name of your school or college.",
    type: "text",
  },
  {
    title: "Add Employment / Business",
    key: "employment",
    placeholder: "Enter your current job title or business name.",
    type: "text",
  },
];

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

export const sideMenuOptions = [
  {
    title: "My Profile",
    route: "MyProfile",
    icon: require("../assets/icons/sideMenu/1.png"),
  },
  {
    title: "Calendar",
    route: "CalendarScreen",
    icon: require("../assets/icons/sideMenu/2.png"),
  },
  {
    title: "Shop",
    route: "Shop",
    icon: require("../assets/icons/sideMenu/3.png"),
  },
  {
    title: "Settings",
    route: "AccountSettings",
    icon: require("../assets/icons/sideMenu/4.png"),
  },
  {
    title: "Challenge Requests",
    route: "ChallengeRequests",
    icon: require("../assets/icons/sideMenu/5.png"),
  },
  {
    title: "Invite Friends",
    route: "Invite",
    icon: require("../assets/icons/sideMenu/invite.png"),
  },
  {
    title: "Community Guidelines",
    route: "CommunityGuidelines",
    icon: require("../assets/icons/sideMenu/5.png"),
  },  
  {
    title: "Terms & Conditions",
    route: "",
    icon: require("../assets/icons/sideMenu/6.png"),
  },
  {
    title: "Privacy Policy",
    route: "",
    icon: require("../assets/icons/sideMenu/7.png"),
  },
  {
    title: "FAQs",
    route: "",
    icon: require("../assets/icons/sideMenu/8.png"),
  },
  {
    title: "Contact Us",
    route: "",
    icon: require("../assets/icons/sideMenu/9.png"),
  },
  {
    title: "About",
    route: "",
    icon: require("../assets/icons/sideMenu/10.png"),
  },
  {
    title: "Sign out",
    route: "",
    icon: require("../assets/icons/sideMenu/11.png"),
    type: "logout",
  },
];

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
