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
      zIndex: 9,
      paddingBottom: getPercent(12, height),
    },
  });

//NotificationCard Styles  starts here
export const NotificationCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(8, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#E5E7EB",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(2, height),
    },
    bellIcon: {
      width: getPercent(11, width),
      height: getPercent(11, width),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#DB2727",
      borderRadius: 100,
      overflow: "hidden",
    },
    content: {
      flex: 0.95,
      paddingHorizontal: 5,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    dotIconBtn: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
    },
  });
