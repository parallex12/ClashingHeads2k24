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
      paddingHorizontal: getPercent(3, width),
    },
    header2Wrapper: {
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      borderBottomWidth: 1,
      paddingVertical: getPercent(2, height),
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: "#F7F8F8",
      borderBottomWidth: 5,
    },
    header2WrapperBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      paddingHorizontal: getPercent(1, width),
    },
  });
