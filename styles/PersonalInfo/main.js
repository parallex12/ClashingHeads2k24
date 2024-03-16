import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: getPercent(5, width),
    },
    content: {
      flex: 1,
      paddingTop: getPercent(7, height),
    },
    formWrapper: {
      width: "100%",
      flex: 1,
      paddingTop: getPercent(4, height),
    },
  });
