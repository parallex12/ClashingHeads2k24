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
      paddingHorizontal: getPercent(5, width),
    },
    clashersContainer: {
      width: "100%",
      minHeight: getPercent(5, height),
      maxHeight: getPercent(40, height),
      borderRadius: 10,
      borderColor: "#E5E7EB",
      marginTop: getPercent(2, height),
      borderWidth: 1,
    },
    transcript_clashersContainer: {
      width: "100%",
      minHeight: getPercent(5, height),
      maxHeight: getPercent(20, height),
      borderRadius: 10,
      borderColor: "#E5E7EB",
      marginTop: getPercent(2, height),
      borderWidth: 1,
    },
    clashersInnerContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      paddingVertical: getPercent(1, width),
    },
  });

export const ClashersCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: getPercent(2.5, width),
      minHeight: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(1, height),
    },
    profile: {
      width: getPercent(10, width),
      height: getPercent(10, width),
      borderRadius: 100,
      marginBottom: getPercent(1, height),
      top: 3,
      overflow: "hidden",
    },
    infoWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

export const TranscriptCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: getPercent(2.5, width),
      minHeight: getPercent(5, height),
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginVertical: getPercent(1, height),
    },
    profile: {
      width: getPercent(10, width),
      height: getPercent(10, width),
      borderRadius: 100,
      marginBottom: getPercent(1, height),
      top: 3,
      overflow: "hidden",
    },
    infoWrapper: {
      flex: 1,
      paddingTop: 10,
      paddingLeft: 15,
    },
    transcriptText: {
      textAlign: "justify",
    },
  });

export const BottomActionsMenu = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(10, height),
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#E5E7EB",
      paddingBottom: getPercent(2, height),
    },
    menuActionsWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: 10,
      borderColor: "#E5E7EB",
    },
    MenuItemWrapper: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      backgroundColor: "#F3F4F6",
      alignItems: "center",
      justifyContent: "center",
      padding: getPercent(1.2, height),
      marginRight: 5,
    },
    leaveRoomBtn: {
      width: getPercent(28, width),
      height: getPercent(5, height),
      borderRadius: 100,
      backgroundColor: "#F3F4F6",
      alignItems: "center",
      justifyContent: "center",
    },
  });
