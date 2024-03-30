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
      paddingBottom: getPercent(10, height),
      paddingHorizontal: getPercent(3.5, width),
    },
    plusIconButton: {
      width: getPercent(6, width),
      height: getPercent(6, width),
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "#fff",
    },
    searchHeader: {
      flexDirection: "row",
      marginVertical: getPercent(1, height),
    },
    sortIcon: {
      flex: 0.1,
      paddingHorizontal: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonsWrapper: {
      minHeight: getPercent(7, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(0.5, height),
    },
    groupsBtn: {
      width: getPercent(30, width),
      height: getPercent(5, height),
      borderRadius: 100,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F7F7F8",
      flexDirection: "row",
    },
    groupsBtnNumberWrapper: {
      backgroundColor: "#111827",
      borderRadius: 100,
      padding: 5,
      marginLeft: 10,
    },
  });
