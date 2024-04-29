// atoms.js
import { atom } from "recoil";
import { notificationSettingsOptions, privacySettingsOptions } from "../../utils";

export const registrationForm = atom({
  key: "registrationForm",
  default: {},
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

export const global_posts = atom({
  key: "global_posts",
  default: [
    {
      id: 1,
      author: 123,
      createdAt: new Date()?.toDateString(),
      title: "Should we eliminate taxes for the wealthy people?",
      postDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      postMedia: {
        images: [
          "https://t3.ftcdn.net/jpg/03/79/17/00/360_F_379170051_7No0Yg8z2uxbyby4Y0WFDNCBZo18tNGr.jpg",
        ],
        audio:
          "https://firebasestorage.googleapis.com/v0/b/clashing-head-ae0e6.appspot.com/o/debates%2FWas%20Silicon%20Valley%20Bank%E2%80%99s%20collapse%20really%20due%20to%20their%20policy%20of%20diversity%3F%2Fopinions%2FfusmPXq0kaXLBj6MR0q87Kwz8KE21.mp4?alt=media&token=e0ba6205-5933-4632-b9f1-6d09445482e2",
      },
      postStats: {
        likes: 10,
        dislikes: 20,
        clashes: [],
        reports: null,
        share: 0,
      },
    },
    {
      id: 3,
      author: 123,
      createdAt: new Date()?.toDateString(),
      title: "Should we eliminate taxes for the wealthy people?",
      postDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      postMedia: {
        images: [],
        audio:
          "https://firebasestorage.googleapis.com/v0/b/clashing-head-ae0e6.appspot.com/o/debates%2FWas%20Silicon%20Valley%20Bank%E2%80%99s%20collapse%20really%20due%20to%20their%20policy%20of%20diversity%3F%2Fopinions%2FfusmPXq0kaXLBj6MR0q87Kwz8KE21.mp4?alt=media&token=e0ba6205-5933-4632-b9f1-6d09445482e2",
      },
      postStats: {
        likes: 10,
        dislikes: 20,
        clashes: [],
        reports: null,
        share: 0,
      },
    },
  ],
});
