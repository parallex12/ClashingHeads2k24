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
      paddingBottom: getPercent(2, height),
      paddingHorizontal: getPercent(3, width),
    },
  });

//headerStyles starts here
export const headerStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(14, height),
      paddingBottom: getPercent(2, height),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
    },
    searchRow: {
      width: "100%",
      height: getPercent(8, height),
      flexDirection: "row",
      alignItems: "center",
    },
    searchInputWrapper: {
      flex: 0.92,
      height: getPercent(5, height),
      backgroundColor: "#F6F7F8",
      borderRadius: 100,
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
    filtersWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
    },
    filterItem: {
      paddingHorizontal: getPercent(6, width),
      height: getPercent(5, height),
      borderRadius: 100,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#F3F4F6",
    },
  });
