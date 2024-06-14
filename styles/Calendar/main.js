import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    content: {
    },
    container: {
      width: getPercent(100, width),
      height: getPercent(100, height),
      backgroundColor: "#fff",
      alignItems: "center",
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    arrowLeft: {
      position: "absolute",
      left: wp("20%"),
    },
    arrowRight: {
      position: "absolute",
      right: wp("20%"),
    },
    dayWrapper: {
      padding: wp("2.5%"),
      borderBottomWidth: 1,
      width: "100%",
      borderColor: "#F1F1F1",
      alignItems: "center",
      justifyContent: "center",
    },
    dayText: {
      fontSize: rf(580),
      fontFamily: "MSB",
    },
    eventWrapper: {
      paddingHorizontal: wp("3%"),
      borderWidth: 1,
      borderColor: "#F1F1F1",
      borderBottomWidth: 0,
    },
    event: {
      width: "100%",
      minHeight: hp("10%"),
      borderRadius: 16,
      backgroundColor: "#F3F4F6",
      paddingVertical: getPercent(1, height),
      marginVertical: hp("1%"),
      justifyContent: "space-around",
      paddingHorizontal: getPercent(3, width),
    },
    eventTitle: {
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#111827",
      marginBottom: 5,
    },
    eventTime: {
      fontSize: rf(10),
      fontFamily: "Regular",
      color: "#6B7280",
      marginLeft: 5,
    },
    agendaTimeWrapper: {
      flex: 0.2,
    },
    agendaTime: {
      position: "absolute",
      left: 10,
      top: 5,
      fontSize: rf(10),
      fontFamily: "Regular",
      color: "#999999",
      textAlign: "right",
    },
    agendaMiddleIndicator: {
      position: "absolute",
      left: 0,
      width: "15%",
      borderBottomWidth: 1,
      top: "50%",
      borderColor: "#F1F1F1",
    },
    userWrapper: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    useritem: {
      width: getPercent(6, width),
      height: getPercent(6, width),
      borderRadius: 100,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "#fff",
    },
  });
