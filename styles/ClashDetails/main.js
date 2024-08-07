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
      paddingHorizontal: getPercent(3, width),
    },
    clashes_wrapper: {
      width: "100%",
      paddingVertical: getPercent(2, height),
      paddingHorizontal: getPercent(4, width),
      alignItems:"center",
    },
  });
