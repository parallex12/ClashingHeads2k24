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
    titleHeaderWrapper: {
      paddingHorizontal: getPercent(5, width),
      marginVertical: getPercent(1, height),
    },
    newsWrapper: {
      paddingHorizontal: getPercent(5, width),
    },
  });
