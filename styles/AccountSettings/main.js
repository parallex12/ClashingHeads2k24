import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue, RFValue as rf } from "react-native-responsive-fontsize";
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
      paddingBottom: getPercent(12, height),
      paddingHorizontal: getPercent(5, width),
    },
    settingCardWrapper: {},
    titleWrapper: {
      marginVertical: getPercent(2, height),
    },
  });

//SettingsCard Styles  starts here
export const SettingsCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: getPercent(6, height),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E4E4E4",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(2, width),
      marginVertical: 10,
    },
    iconWrapper: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: RFValue(14.5),
      fontFamily: "Regular",
      color: "#111827",
    },
    rightChevronBtn: {
      width: getPercent(3.4, height),
      height: getPercent(3.4, height),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      backgroundColor: "rgba(82,87,83,0.1)",
    },
  });
