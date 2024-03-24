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

//PostCardStyles starts here
export const PostCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(15, height),
      backgroundColor: "#222",
      paddingHorizontal: getPercent(3, width),
      paddingTop:10
    },
  });

//BottomMenu Styles starts here
export const BottomMenuStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(9.5, height),
      alignItems: "center",
      justifyContent: "space-around",
      position: "absolute",
      bottom: 0,
      borderColor: "#EEECEC",
      borderWidth: 1,
      borderRadius: 20,
      flexDirection: "row",
      paddingHorizontal: getPercent(2, width),
      paddingBottom: 5,
    },
    bottomMenuItem: {
      height: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
    },
    itemIconWrapper: {
      width: getPercent(3, height),
      height: getPercent(3, height),
    },
  });

//StandardHeader Styles starts here
export const StandardHeaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(18, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: StatusBar.currentHeight + getPercent(2.5, height),
      paddingHorizontal: getPercent(4, width),
    },
  });

//RecordingButton Stylesstarts here
export const RecordingButtonStyles = ({ width, height }) =>
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

//StandardInput Styles starts here
export const StandardInputStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(10, height),
      justifyContent: "space-around",
      marginVertical: getPercent(1, height),
    },
    titleText: {
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#111827",
    },
    inputWrapper: {
      width: "100%",
      height: getPercent(15, width),
      borderRadius: 100,
      borderColor: "#E5E7EB",
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(4, width),
      marginTop: 10,
      position: "relative",
    },
    input: {
      flex: 1,
      height: "100%",
      fontSize: rf(10),
      fontFamily: "Regular",
      color: "#111827",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    inputText: {
      fontSize: rf(10),
      fontFamily: "Regular",
      color: "#111827",
    },
    dropDownContainer: {
      width: "100%",
      minHeight: getPercent(20, height),
      maxHeight: getPercent(40, height),
      backgroundColor: "#fff",
      position: "absolute",
      zIndex: 999999,
      bottom: getPercent(10, height),
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignSelf: "center",
      paddingVertical: getPercent(3, width),
      justifyContent: "space-between",
    },
    dropDownItem: {
      width: "92%",
      alignSelf: "center",
      height: getPercent(5, height),
      backgroundColor: "#E5E7EB",
      alignItems: "center",
      paddingHorizontal: getPercent(3, width),
      marginBottom: 5,
      borderRadius: 5,
      flexDirection: "row",
    },
    dropDownItemText: {
      fontSize: rf(12),
      fontFamily: "Medium",
      color: "#111827",
      marginLeft: 10,
    },
    radioCircle: {
      width: getPercent(4, width),
      height: getPercent(4, width),
      borderWidth: 1,
      borderRadius: 100,
      backgroundColor: "#e5e5e5",
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
      flex: 1,
      flexDirection: "row",
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
