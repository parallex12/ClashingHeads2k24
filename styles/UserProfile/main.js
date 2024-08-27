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
    innercontent:{
      paddingHorizontal: getPercent(3, width),
    },
    ContentLoader: {
      width: "100%",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(2, height),
    },
  });

//ProfileCardstyles starts here
export const ProfileCardstyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      borderColor: "#F7F8F8",
      borderBottomWidth:5
    },
    cardHeaderContainer: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 5,
    },
    post_following_followers_Item: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
    },
    userInfoWrapper: {
    },
    usernameWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    action_buttons_wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      width: "18%",
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
    bioEditwrapper: {
      width:'100%',
      paddingVertical: getPercent(0.5, height),
      paddingHorizontal: getPercent(3, width),
      alignItems: "center",
      flexDirection: "row",
    },
    bioicons: {
      width: getPercent(4, width),
      height: getPercent(4, width),
      marginRight: 5,
    },
  });
