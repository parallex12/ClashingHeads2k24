import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffffff'
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
      paddingTop: 10,
    },
    cardHeaderProfileWrapper: {},
    cardHeaderProfile: {
      width: getPercent(20, width),
      height: getPercent(20, width),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
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
      marginVertical:10
    },
    usernameWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    action_buttons_wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingVertical: getPercent(2, height),
    },
    listenButton: {
      marginHorizontal: 4,
      minHeight: getPercent(4.55, height),
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "center",
    },
    bioEditwrapper: {
      width: "100%",
      paddingVertical: getPercent(0.2, height),
      alignItems: "center",
      flexDirection: "row",
    },
    bioicons: {
      width: getPercent(4, width),
      height: getPercent(4, width),
      marginRight: 5,
    },
    volumeIcon: {
      width: "20%",
      height: "70%",
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
