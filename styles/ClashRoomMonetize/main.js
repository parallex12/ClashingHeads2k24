import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingBottom:getPercent(4,height)
    },
    formWrapper: {
      width: "100%",
      flex: 1,
      paddingHorizontal: getPercent(3, width),
    },
  });
//container Styles starts here
export const HeaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(13, height),
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderWidth: 1,
      paddingHorizontal: getPercent(3, width),
      paddingTop: getPercent(4, height),
      borderColor: "#F7F8F8",
    },
  });
