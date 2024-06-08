import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      alignItems: "center",
      paddingBottom: getPercent(4, height),
    },
    content: {
      flex: 1,
      paddingVertical: getPercent(0, height),
      alignItems: "center",
      justifyContent: "space-between",
    },
    formWrapper: {
      width: "95%",
      flex: 1,
      paddingTop: getPercent(2, height),
    },
    recordingWrapper: {
      marginVertical: getPercent(1, height),
    },
    inputText: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#111827",
      marginVertical: 5,
    },
  });
