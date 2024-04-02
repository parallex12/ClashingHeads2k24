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
      paddingBottom: getPercent(10, height),
      paddingHorizontal: getPercent(3, width),
    },
    contentHeaderWrapper: {
      flex: 1,
      minHeight: getPercent(6, height),
      paddingVertical: getPercent(1.5, height),
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    contectActionsWrapper: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    contentCalenderBtn: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
      padding: 7,
    },
    contentCreateBtn: {
      height: getPercent(4.5, height),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: getPercent(5, width),
    },
    
  });
//ClashCardStyles starts here
export const ClashCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(14, height),
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(3, width),
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: getPercent(2, height),
    },
    infoWrapper: {
      flex: 1.8,
      justifyContent: "space-between",
    },
    infoWrapperRow: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    totalClashersWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      right: 5,
      marginLeft: getPercent(5, width),
    },
    featuredBtn: {
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(0.5, height),
      borderRadius: 100,
      backgroundColor: "#E1E1FE",
      alignItems: "center",
      justifyContent: "center",
      marginRight: getPercent(3, width),
    },
    clashersContainer: {
      flex: 1,
      height: "100%",
      alignItems: "center",
    },
    clashersWrapper: {
      width: getPercent(25, width),
      height: getPercent(11, height),
      alignItems: "center",
      justifyContent: "center",
    },
    clasherProfile1: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderRadius: 100,
      position: "absolute",
      left: 0,
      borderWidth: 2,
      borderColor: "#ffffff",
    },
    clasherProfile2: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#ffffff",
      position: "absolute",
      right: 0,
    },
    clasherProfile3: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#ffffff",
      position: "absolute",
      top: 0,
    },
    clasherProfile4: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#ffffff",
      position: "absolute",
      bottom: 0,
    },
    clasherProfile5: {
      width: getPercent(4.5, height),
      height: getPercent(4.5, height),
      borderRadius: 100,
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    publicBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
