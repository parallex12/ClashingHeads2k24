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
      paddingTop: getPercent(7, height),
      alignItems: "center",
      justifyContent: "center",
    },
    textWrapper: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
  });

//AddPostDetailsStyles  starts here
export const AddPostDetailsStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    content: {
      flex: 1,
      paddingVertical: getPercent(2, height),
      alignItems:'center',
      justifyContent: "space-between",
    },
    postInputWrapper: {
      width: "95%",
      minHeight: getPercent(5, height),
      paddingHorizontal: getPercent(5, width),
      paddingVertical: getPercent(2, width),
      borderWidth:1,
      borderRadius:5,
      marginVertical:getPercent(1,height),
      borderColor:'#e5e5e5'
    },
    mediaWrapper: {
      width: "100%",
      flex:1,
      paddingHorizontal: getPercent(2, width),
      marginVertical:getPercent(2,height)
    },
    mediaImg:{
      width: "100%",
      height: getPercent(20,height),
      marginRight: 5,
      borderRadius:5
    },
    postInput: {
      flex: 1,
      fontSize: 16,
      fontFamily: "Regular",
    },
    postBottomActionsWrapper: {
      width: "100%",
      height: getPercent(8, height),
      borderTopWidth: 1,
      paddingHorizontal: getPercent(5, width),
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderColor: "#F7F8F8",
      paddingBottom: getPercent(1, height),
      backgroundColor:'#fff'
    },
    uploadBtnWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    privacyBtn: {
      width: "25%",
      minHeight: getPercent(4, height),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      backgroundColor: "#F3F4F6",
      flexDirection: "row",
    },
  });
