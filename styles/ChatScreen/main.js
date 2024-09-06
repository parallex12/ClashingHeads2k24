import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";
import { font } from "../Global/main";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    content: {
      flex: 1,
      justifyContent:'flex-end'
      // paddingTop: getPercent(3, height),
    },
  });

//HeaderStyles Styles starts here
export const HeaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(16, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: StatusBar.currentHeight + getPercent(3.5, height),
      paddingHorizontal: getPercent(4, width),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
      backgroundColor: "#DB2727",
    },
    col1: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    col2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    col3: {
      flex: 0.5,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    title: font(17, "#fff", "Regular", 0, 0, { marginHorizontal: 5 }),
    status: font(12, "#fff", "Regular", 2, 0, { marginHorizontal: 5 }),
  });
