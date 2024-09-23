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
      alignItems: "center",
      justifyContent: "center",
    },
    logoWrapper: {
      width: "100%",
      height: getPercent(25, width),
    },
    logo: {
      width: "100%",
      height: "100%",
    },
    formWrapper: {
      width: "100%",
      flex: 0.5,
      paddingTop: getPercent(4, height),
    },
    formTitle: {
      marginBottom: 10,
    },
    signupText: {
      textAlign: "center",
    },
  });
