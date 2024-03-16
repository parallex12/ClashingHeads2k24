import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue, RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//standardButton Styles starts here
export const standardButtonStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(5, height),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: rf(13),
      fontFamily: "Medium",
      color: "#fff",
    },
  });

//BackButton Styles  starts here
export const BackButtonStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(5, height),
      height: getPercent(5, height),
      justifyContent: "center",
      alignSelf: "flex-start",
    },
  });

//PinCodeInputStyles   starts here
export const PinCodeInputStyles = ({ width, height }) =>
  StyleSheet.create({
    otpComp: {
      width: getPercent(14, width),
      height: getPercent(14, width),
      borderWidth: 1,
      borderRadius: 100,
      borderColor: "#E5E7EB",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    otp_input: {
      width: "100%",
      flex: 1,
      fontSize: rf(25),
      fontFamily: "Medium",
      color: "#222",
      textAlign: "center",
    },
    otpCompWrapper: {
      flex:1,
      flexDirection:'row',
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

//CountryCodeFieldStyles starts here
export const CountryCodeFieldStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(15, width),
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      justifyContent: "space-between",
      marginVertical: getPercent(2, height),
      overflow: "hidden",
      flexDirection: "row",
    },
    codePickerWrapper: {
      width: "25%",
      borderRightWidth: 1,
      borderColor: "#E5E7EB",
      alignItems: "center",
      justifyContent: "center",
    },
    codeText: {
      fontSize: rf(15),
      fontFamily: "Regular",
      color: "#000000",
    },
    inputField: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      fontSize: rf(14),
      fontFamily: "Regular",
      color: "#74737A",
    },
  });

//loader Styles starts here
export const loaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      position: "absolute",
      left: 0,
      zIndex: 9999999,
      top: getPercent(20, height),
    },
  });
export const font = (s, c, fm, mv, lh, extras) => {
  return {
    fontSize: RFValue(s),
    color: c,
    fontFamily: fm,
    marginVertical: mv,
    lineHeight: lh,
    ...extras,
  };
};
