import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    content: {
      flex: 1,
      paddingTop: getPercent(1, height),
      zIndex: 9,
      paddingBottom: getPercent(12, height),
    },
  });

//ProfileCardstyles starts here
export const ProfileCardstyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      borderBottomWidth: 10,
      borderColor: "#F7F8F8",
    },
    cardHeaderContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: 10,
    },
    cardHeaderProfileWrapper: {
    },
    cardHeaderProfile: {
      width: getPercent(20, width),
      height: getPercent(20, width),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      overflow:'hidden'
    },
    cardHeaderProfileCameraIcon: {
      width: getPercent(7, width),
      height: getPercent(7, width),
      borderRadius: 100,
      backgroundColor: "#FFFFFF",
      position: "absolute",
      right: 0,
      bottom: 0,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      alignItems: "center",
      justifyContent: "center",
    },
    post_following_followers_cont: {
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    post_following_followers_Item: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    userInfoWrapper: {
      paddingHorizontal: getPercent(3, width),
    },
    usernameWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    action_buttons_wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: getPercent(2, width),
      paddingVertical: getPercent(2, height),
    },
    listenButton: {
      marginHorizontal: 4,
      height: getPercent(4.55, height),
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
    },
    volumeIcon: {
      width: "20%",
      height: "75%",
      marginRight: 8,
    },
    settingsButton: {
      width: getPercent(10, width),
      height: getPercent(10, width),
      backgroundColor: "#F3F4F6",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: getPercent(2, width),
    },
  });
