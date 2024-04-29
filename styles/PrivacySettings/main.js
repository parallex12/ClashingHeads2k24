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
      paddingBottom: getPercent(4, height),
    },
    titleWrapper: {
      marginTop: getPercent(2, height),
      paddingHorizontal: getPercent(5, width),
    },
    optionsWrapper: {
      marginVertical: getPercent(1, height),
    },
  });
