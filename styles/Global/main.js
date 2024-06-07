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

//EmptyBoxStyles Styles starts here
export const EmptyBoxStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(5, height)
    },
    text: {
      fontSize: rf(13),
      fontFamily: 'Regular',
      marginVertical: getPercent(2, height)
    }
  });

//LogoutPressStyles  starts here
export const LogoutPressStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
    },
  });

//FullScreenLoader Styles starts here
export const FullScreenLoaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000,
    },
  });

//NewsCardStyles Styles starts here
export const NewsCardStyles = ({ width, height }) =>
  StyleSheet.create({
    newsCardCont: {
      width: "100%",
      minHeight: getPercent(10, height),
      borderBottomWidth: 1,
      borderColor: "#F3F3F3",
      paddingVertical: 10,
      marginTop: 10,
    },
    cardRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    newsCardThumbnailCont: {
      width: "28%",
      height: getPercent(12, height),
      borderRadius: 10,
      overflow: "hidden",
    },
    newsContentWrapper: {
      flex: 1,
      height: "100%",
      paddingVertical: 5,
      paddingHorizontal: getPercent(3, width),
    },
    cardFooterWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: getPercent(7, height),
      marginTop: 10,
    },
    cardFootercompanyLogo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    companyLogo: {
      width: getPercent(8, width),
      height: getPercent(8, width),
      borderRadius: 100,
      overflow: "hidden",
      marginRight: 10,
    },
  });

//SettingSwitchCard Styles  starts here
export const SettingSwitchCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: getPercent(1.5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
      paddingHorizontal: getPercent(5, width),
    },
    text: {
      flex: 0.95,
      textAlign: "left",
      lineHeight: 22,
    },
  });

//StandardSwitchStyles starts here
export const StandardSwitchStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(5, height),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
  });

//EmojisStyles   starts here
export const EmojisStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: getPercent(1, height),
    },
    emojiItemCont: {
      width: getPercent(7, width),
      height: getPercent(7, width),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginHorizontal: 10,
    },
  });


//StickersStyles   starts here
export const StickersStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(1, height),
    },
    emojiItemCont: {
      width: getPercent(20, width),
      height: getPercent(15, width),
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginHorizontal: 10,
      borderWidth: 2,
    },
  });

//CalendarTimeBottomSheet Styles starts here
export const CalendarTimeBottomSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-around",
    },
    titleWrapper: {
      width: "100%",
      paddingVertical: getPercent(2, height),
      paddingHorizontal: getPercent(5, width),
      marginBottom: getPercent(1, height),
      borderColor: "#F7F8F8",
      borderWidth: 1,
    },
    timerWrapper: {
      width: "100%",
      height: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
    },
    calendarTimeWrapper: {
      flex: 0.8,
    },
    timerText: font(16, "#222", "Regular"),
    changeModeBtn: {
      width: getPercent(11, width),
      height: getPercent(11, width),
      borderRadius: 100,
      backgroundColor: "rgba(0,0,0,0.1)",
      alignSelf: "flex-end",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    micWrapper: {
      width: "100%",
      height: getPercent(30, width),
    },
    quickAudioWrapper: {
      width: "100%",
      minHeight: getPercent(5, width),
    },
    footerWrapper: {
      width: "100%",
      height: getPercent(10, height),
      borderTopWidth: 1,
      borderColor: "#F7F8F8",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(5, width),
    },

    timeComponentWrapper: {
      width: "100%",
      minHeight: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: getPercent(1, height),
      paddingHorizontal: getPercent(5, width),
      paddingVertical: 10,
    },
    hour_minutes_wrapper: {
      flexDirection: "row",
      width: getPercent(25, width),
      height: getPercent(5, height),
      backgroundColor: "#F5F6F7",
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    hour_minutes_input_wrapper: {
      flex: 1,
      fontSize: RFValue(12.5),
      fontFamily: "Regular",
      color: "#9CA3AF",
      marginHorizontal: 2,
      textAlign: "center",
    },
    am_pm_wrapper: {
      width: getPercent(30, width),
      height: getPercent(5, height),
      borderRadius: 100,
      backgroundColor: "#F5F6F7",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    am_pm_active_wrapper: {
      width: "48%",
      height: "90%",
      borderRadius: 100,
      backgroundColor: "#DB2727",
      alignItems: "center",
      justifyContent: "center",
    },
    am_pm_disable_wrapper: {
      width: "48%",
      height: "90%",
      borderRadius: 100,
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
  });
//CalendarBottomSheet  Styles starts here
export const CalendarBottomSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    titleWrapper: {
      width: "100%",
      paddingVertical: getPercent(2, height),
      paddingHorizontal: getPercent(5, width),
      marginBottom: getPercent(1, height),
      borderColor: "#F7F8F8",
      borderBottomWidth: 1,
    },
    timerWrapper: {
      width: "100%",
      height: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
    },
    calendarWrapper: {
      // paddingHorizontal: getPercent(5, width),
    },
    timerText: font(16, "#222", "Regular"),
    changeModeBtn: {
      width: getPercent(11, width),
      height: getPercent(11, width),
      borderRadius: 100,
      backgroundColor: "rgba(0,0,0,0.1)",
      alignSelf: "flex-end",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    micWrapper: {
      width: "100%",
      height: getPercent(30, width),
    },
    quickAudioWrapper: {
      width: "100%",
      minHeight: getPercent(5, width),
    },
    footerWrapper: {
      width: "100%",
      height: getPercent(10, height),
      borderTopWidth: 1,
      borderColor: "#F7F8F8",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(5, width),
    },
  });

//FlagReportBottomSheet Styles   starts here
export const FlagReportBottomSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    card_header_wrapper: {
      width: "100%",
      paddingVertical: getPercent(1, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: "#F3F4F6",
      borderBottomWidth: 1,
      paddingHorizontal: getPercent(3, width),
    },
    sheetContentContainer: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: getPercent(3, width),
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: getPercent(2, height),
      paddingBottom: getPercent(10, height),
    },
    categoriesWrapper: {
      width: "100%",
      flex: 1,
    },
    categoriesItemWrapper: {
      width: "100%",
      minHeight: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderColor: "#F3F4F6",
      paddingVertical: 15,
    },
  });
//VoiceRecorderBottomSheet  Styles starts here
export const VoiceRecorderBottomSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: getPercent(5, width),
      alignItems: "center",
      justifyContent: "flex-start",
    },
    timerWrapper: {
      width: "100%",
      height: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
    },
    timerText: font(16, "#222", "Regular"),
    changeModeBtn: {
      width: getPercent(11, width),
      height: getPercent(11, width),
      borderRadius: 100,
      backgroundColor: "rgba(0,0,0,0.1)",
      alignSelf: "flex-end",
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
    },
    micWrapper: {
      width: "100%",
      height: getPercent(30, width),
      borderRadius:10,
      overflow:'hidden'
    },
    quickAudioWrapper: {
      width: "100%",
      minHeight: getPercent(5, width),
    },
  });

//SearchBar Styles  starts here
export const SearchBarStyles = ({ width, height }) =>
  StyleSheet.create({
    searchRow: {
      flex: 0.9,
      flexDirection: "row",
      alignItems: "center",
    },
    searchInputWrapper: {
      flex: 1,
      height: getPercent(5.5, height),
      backgroundColor: "#F6F7F8",
      borderRadius: 100,
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
  });

//SideMenu Styles  starts here
export const SideMenuStyles = ({ width, height }) =>
  StyleSheet.create({
    listWrapper: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
    },
    footerWrapper: {},
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: getPercent(5, height),
      marginVertical: getPercent(0.5, height),
    },
    listIcon: {
      width: "7%",
      height: "100%",
      marginRight: 12,
    },
    profileView: {
      width: "100%",
      height: getPercent(10, height),
      flexDirection: "row",
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    profile: {
      width: getPercent(10, width),
      height: getPercent(10, width),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
      overflow: "hidden",
    },
    info: {},
  });

//ClashCard Styles starts here
export const ClashCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: "#ffffff",
    },
    content: {
      alignItems: "center",
      justifyContent: "center",
    },
    contentCardWrapper: {
      width: "87%",
      alignSelf: "flex-end",
      marginTop: getPercent(1, height),
      marginBottom: getPercent(2, height),
    },
    hrLine: {
      width: 1,
      height: "100%",
      backgroundColor: "#E5E7EB",
      position: "absolute",
      left: "5%",
    },
  });

//PostCardStyles starts here
export const PostCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(15, height),
      backgroundColor: "#ffffff",
      paddingTop: 10,
      borderColor: "#F7F8F8",
    },
    content: {
      paddingHorizontal: getPercent(3, width),
      alignItems: "center",
      justifyContent: "center",
    },
    postDateAndViews: {
      width: "100%",
      height: getPercent(5, height),
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "#F7F8F8",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
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
      zIndex: 99999,
      backgroundColor: "#ffffff",
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

//StandardHeader2 Styles starts here
export const StandardHeader2Styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      height: getPercent(15, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: StatusBar.currentHeight + getPercent(4.5, height),
      paddingHorizontal: getPercent(4, width),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
    },
    col1: {
      flex: 0.5,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    col2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    col3: {
      flex: 0.5,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    title: font(17, "#111827", "Semibold"),
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
    col1: {
      flex: 0.5,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    col2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    col3: {
      flex: 0.5,
      alignItems: "flex-end",
      justifyContent: "center",
    },
    title: font(17, "#FFFFFF", "Semibold"),
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
    fontSize: RFValue(s) - 1,
    color: c,
    fontFamily: fm,
    marginVertical: mv,
    lineHeight: lh == 0 ? null : lh,
    ...extras,
  };
};
