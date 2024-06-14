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
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: getPercent(2, height),
    },
    banner: {
      width: "100%",
      height: getPercent(6, height),
      backgroundColor: "#000000",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    bannerLogo: {
      width: "100%",
      height: getPercent(10, height),
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: getPercent(2, width),
      borderBottomWidth: 1,
      borderColor: "#E7E7E7",
    },
    boardgame_wrapper: {
      width: "100%",
      height: getPercent(44, height),
      backgroundColor: "#F6F6F6",
      alignItems: "center",
      justifyContent: "center",
    },
    orderInfoWrapper: {
      paddingTop: getPercent(2, height),
      paddingHorizontal: getPercent(4, width),
      borderBottomWidth: 1,
      borderColor: "#E5E7EB",
      justifyContent: "space-between",
    },
    orderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical: getPercent(2, height),
    },
    quantityWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityBtn: {
      width: getPercent(6, width),
      height: getPercent(6, width),
      borderWidth: 1,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 8,
    },
  });
