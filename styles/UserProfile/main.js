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
      overflow: "hidden",
    },
    cardHeaderProfile: {
      width: getPercent(20, width),
      height: getPercent(20, width),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      overflow:'hidden'
    },
    cardHeaderProfileOnlineDot: {
      width: getPercent(4, width),
      height: getPercent(4, width),
      
      borderRadius: 100,
      backgroundColor: "#6FCF97",
      position: "absolute",
      right: 2,
      bottom: 2,
      borderWidth: 1.5,
      borderColor: "#ffffff",
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
      justifyContent: "space-between",
      paddingHorizontal: getPercent(2, width),
      paddingVertical: getPercent(2, height),
    },
    listenButton: {
      flex: 1,
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
    followButton: {
      flex: 1,
      marginHorizontal: 4,
      height: getPercent(4.55, height),
      backgroundColor: "#56CCF2",
    },
    messageButton: {
      flex: 1,
      marginHorizontal: 4,
      height: getPercent(4.55, height),
      borderWidth: 1,
      borderColor: "#9CA3AF",
      backgroundColor: "transparent",
    },
  });
