import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue, RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//standardButton Styles starts here
export const standardButtonStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(4, height),
      maxHeight: getPercent(9, height),
      backgroundColor: "#DB2727",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 16,
      fontFamily: "Medium",
      color: "#fff",
    },
  });

//ChallengeCardStyles starts here
export const ChallengeCardStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerCont: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    clashesCardWrapper: {
      flex: 1,
      borderColor: "#F7F8F8",
    },
    clashesCardCont: {
      width: "100%",
      minHeight: getPercent(15, height),
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      paddingTop: 20,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      alignSelf: "center",
    },
    body: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: getPercent(3, width),
    },
    clashesCardTitle: font(19, "#1F2937", "Medium", 5, null, {
      textAlign: "center",
      width: "90%",
    }),
    clashesCardUsersCont: {
      flex: 1,
      marginVertical: getPercent(2, height),
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    clashUserItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    clashUserItemInner: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: getPercent(1, width),
    },
    clashUserProfile: {
      width: getPercent(16, width),
      height: getPercent(16, width),
      borderRadius: 100,
      marginVertical: 4,
      overflow: "hidden",
    },
    votedBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      borderRadius: 100,
      backgroundColor: "rgba(219,39,39,1)",
      alignItems: "center",
      justifyContent: "center",
    },
    actionBtnRow: {
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    VoteBtn: {
      minWidth: getPercent(22, width),
      height: getPercent(7, width),
      flexDirection: "row",
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "space-around",
    },
    requetBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius:100,
      margin: 5,
    },
    acceptBtn: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      margin: 5,
      borderRadius:100,
      backgroundColor: "#6FCF97",
    },
    requetBtnText: {
      fontSize: 15,
      fontFamily: "BLP",
      marginRight: 8,
    },
    cardFooterWrapper: {
      width: "100%",
      height: getPercent(5, height),
      borderTopWidth: 1,
      borderColor: "#E5E7EB",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal:getPercent(3,width),
    },
    cardFooterItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal:5
    },
    vsText: {
      fontSize: 30,
      color: "#DB2727",
      fontFamily: "BLP",
      alignSelf: "flex-start",
      top: getPercent(3, height),
    },
    votingFooterWrapper: {
      width: "100%",
      height: getPercent(10, height),
      backgroundColor: "#E5E7EB",
    },
    votingItem: {
      width: "100%",
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      backgroundColor: "rgba(219,39,39,0.24)",
      paddingVertical:5
    },
    votingItemText: {
      fontSize: 15,
      fontFamily: "Semibold",
      color: "#000000",
    },
    votingItemOpponent: {
      width: "100%",
      height: getPercent(5, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      paddingVertical:5

    },
    votingItemTextOpponent: {
      fontSize: 15,
      fontFamily: "Regular",
      color: "#000000",
    },
  });
//ImageViewerStyles starts here
export const ImageViewerStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    postImageWrapper: {
      width: "100%",
      minHeight: getPercent(15, height),
      maxHeight: getPercent(25, height),
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
      marginBottom: getPercent(1, height),
    },
    fullScreenContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.9)",
      justifyContent: "center",
      alignItems: "center",
    },
    fullScreenBackground: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    fullScreenImage: {
      width: "100%",
      height: "100%",
    },
  });

//SenderMessagestylesstarts here
export const SenderMessagestyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#DB2727",
      maxWidth: "85%",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: getPercent(1, height),
      minHeight: getPercent(5, height),
      borderRadius: 10,
      justifyContent: "center",
      alignSelf: "flex-end",
      marginVertical: getPercent(0.5, height),
    },
    text: {
      fontSize: 15,
      fontFamily: "Regular",
      color: "#fff",
    },
    time: {
      fontSize: 12,
      fontFamily: "Medium",
      color: "#222",
      textAlign: "right",
      marginRight: 5,
    },
    infoWrapper: {
      flexDirection: "row",
      alignSelf: "flex-end",
      alignItems: "center",
      justifyContent: "center",
    },
  });

//RecieverMessagestyles  starts here
export const RecieverMessagestyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      maxWidth: "85%",
      paddingHorizontal: getPercent(4, width),
      paddingVertical: getPercent(1, height),
      minHeight: getPercent(5, height),
      backgroundColor: "#9CA3AF",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      marginVertical: getPercent(0.2, height),
    },
    text: {
      fontSize: 15,
      fontFamily: "Regular",
      color: "#fff",
    },
    time: {
      fontSize: 12,
      fontFamily: "Medium",
      color: "#222",
      textAlign: "left",
      marginRight: 5,
    },
    infoWrapper: {
      flexDirection: "row",
      alignSelf: "flex-start",
      alignItems: "center",
      justifyContent: "center",
    },
  });

//EmptyBoxStyles Styles starts here
export const EmptyBoxStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(35, height),
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: getPercent(3, width),
    },
    text: {
      minHeight: getPercent(10, height),
      fontSize: rf(15),
      fontFamily: "BLP",
      textAlign: "center",
      color: "#6B7280",
    },
  });

//TypingComponentstyles Styles starts here
export const TypingComponentstyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(2, width),
      flexDirection: "row",
      borderColor: "#E5E7EB",
      borderTopWidth: 1,
      paddingBottom: getPercent(3, height),
      paddingTop: getPercent(2, height),
      backgroundColor: "#fff",
    },
    actionWrapper: {
      width: getPercent(4, height),
      height: getPercent(4, height),
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 0,
    },
    inputWrapper: {
      flex: 1,
      height: getPercent(5, height),
      overflow: "hidden",
      paddingHorizontal: getPercent(2, width),
      borderColor: "#E5E7EB",
      backgroundColor: "#F6F7F8",
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
    },
    input: {
      fontSize: 15,
      color: "#222",
      fontFamily: "Regular",
      width: "100%",
      paddingVertical: 6,
    },
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
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#DB2727",
    },
    title: {
      fontSize: 25,
      fontFamily: "BLP",
      color: "#fff",
      marginVertical: getPercent(2, height),
    },
    slug: {
      fontSize: 15,
      fontFamily: "Regular",
      color: "#fff",
      position: "absolute",
      bottom: getPercent(5, height),
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
      paddingHorizontal: getPercent(2, width),
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
    micWrapper: {
      width: getPercent(9, width),
      height: getPercent(9, width),
      borderRadius: 100,
      overflow: "hidden",
      position: "absolute",
      right: 0,
      alignItems: "center",
      justifyContent: "center",
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

//RoundRecordingComponentStyles   starts here
export const RoundRecordingComponentStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: getPercent(1, height),
    },
    textWrapper: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
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

//PostActionsBottomSheetStyles   starts here
export const PostActionsBottomSheetStyles = ({ width, height }) =>
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
      borderRadius: 10,
      overflow: "hidden",
    },
    quickAudioWrapper: {
      width: "100%",
      minHeight: getPercent(5, width),
    },
  });

//UpdatedVoiceRecorderBottomSheetStyles  Styles starts here
export const UpdatedVoiceRecorderBottomSheetStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {},
    contentContainer: {
      flex: 1,
      paddingHorizontal: getPercent(5, width),
      alignItems: "center",
      paddingBottom: getPercent(5, height),
    },
    timerWrapper: {
      width: "100%",
      height: getPercent(5, height),
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9,
      marginVertical: 5,
    },
    timerText: font(16, "#222", "Regular"),
    changeModeBtn: {
      width: getPercent(10, width),
      height: getPercent(10, width),
      borderRadius: 100,
      backgroundColor: "#DB2727",
      alignSelf: "flex-end",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 999999999,
    },
    micWrapper: {
      width: "100%",
      borderRadius: 10,
      zIndex: 8,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginVertical: getPercent(1, height),
    },
    quickAudioWrapper: {
      width: "100%",
      marginVertical: getPercent(0, height),
    },
    actionBtn: {
      width: getPercent(50, width),
      height: getPercent(7, height),
      marginVertical: getPercent(1, height),
      alignSelf: "center",
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#4B4EFC",
    },
    actionBtnText: {
      color: "#4B4EFC",
    },
    postBtnsWrapper: {
      flex:1,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

//SearchBar Styles  starts here
export const SearchBarStyles = ({ width, height }) =>
  StyleSheet.create({
    searchRow: {
      flex: 1,
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
      paddingBottom: getPercent(3, height),
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
      width: "8%",
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
      marginVertical: getPercent(1, height),
    },
    hrLine: {
      width: 1,
      height: "95%",
      backgroundColor: "#E5E7EB",
      position: "absolute",
      left:'4%',
      top:'5%'
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
      minHeight: getPercent(9.5, height),
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 0,
      borderColor: "#EEECEC",
      borderWidth: 1,
      borderRadius: 20,
      flexDirection: "row",
      paddingHorizontal: getPercent(2, width),
      paddingVertical:5,      
      zIndex: 99999,
      backgroundColor: "#ffffff",
    },
    bottomMenuItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    itemIconWrapper: {
      width: getPercent(3.2, height),
      height: getPercent(3.2, height),
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
      zIndex: 99999,
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
    title: font(21, "#FFFFFF", "Semibold"),
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
      fontSize: 15,
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
      fontSize: 15,
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
      fontSize: 15,
      fontFamily: "Regular",
      color: "#111827",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    inputText: {
      fontSize: 15,
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
      fontSize: 15,
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
      fontSize: 28,
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
      fontSize: 18,
      fontFamily: "Regular",
      color: "#000000",
    },
    inputField: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      fontSize: 17,
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

//global fonts Styles starts here
export const font = (s, c, fm, mv, lh, extras) =>
  StyleSheet.create({
    fontSize: s,
    color: c,
    fontFamily: fm,
    marginVertical: mv,
    lineHeight: lh == 0 ? null : lh,
    ...extras,
  });
