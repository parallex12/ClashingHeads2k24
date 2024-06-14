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
      zIndex: 9,
      paddingBottom: getPercent(12, height),
    },
  });

//TabSelectorStyles  starts here
export const TabSelectorStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderColor: "#F3F4F6",
      marginTop: getPercent(1, height),
    },
    ItemWrapper: {
      height: "100%",
      paddingHorizontal: getPercent(3, width),
      borderBottomWidth: 2,
      marginRight: getPercent(3, width),
    },
  });

//UserCardStyles  starts here
export const UserCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(8, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderColor: "#F3F4F6",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
    },
    profile: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#9CA3AF",
      overflow: "hidden",
    },
    userInfoWrapper: {
      flex: 1,
      marginHorizontal: 10,
    },
  });
