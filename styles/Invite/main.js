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
      paddingHorizontal: getPercent(5, width),
      marginVertical: getPercent(3, height),
    },
    inviteCard: {
      width: "100%",
      minHeight: getPercent(15, height),
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 10,
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1.5, height),
      marginBottom:getPercent(2, height)
    },
    inviteCardRow: {
      flexDirection: "row",
      alignItems:'center'
    },
    inviteCardIcon: {
      width: getPercent(12, width),
      height: getPercent(12, width),
      borderRadius: 100,
      backgroundColor: "#F8F1F1",
      alignItems: "center",
      justifyContent: "center",
    },
    btnWrapper: {
      flex:1,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    btnWrapper2: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
