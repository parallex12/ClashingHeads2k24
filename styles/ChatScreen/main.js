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
      height:getPercent(80,height),
      // paddingTop: getPercent(3, height),
      paddingHorizontal: getPercent(3.5, width),
      bottom: getPercent(2, height),
    },
  });
