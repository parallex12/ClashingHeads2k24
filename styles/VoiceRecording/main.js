import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DB2727",
      paddingHorizontal: getPercent(5, width),
    },
    content: {
      flex: 1,
      paddingTop: getPercent(7, height),
    },
    formWrapper: {
      width: "100%",
      flex: 1,
      paddingTop: getPercent(2, height),
    },
    recorderWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: getPercent(2, height),
    },
    circle: {
      borderRadius: getPercent(70, width),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    textWrapper:{
      flex:0.5,
      alignItems:'center',
      justifyContent:'center',
    }
  });
