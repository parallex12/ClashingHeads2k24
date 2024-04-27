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
    formWrapper: {
      flex: 1,
    },
    formInputcont: {
      width: "100%",
      height: getPercent(10, height),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: 5,
    },
    formInputcont2: {
      width: "100%",
      height: getPercent(8, height),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
      paddingVertical: 5,
      
    },
    titleInput: {
      flex: 1,
    },
    privacyBtn: {
      width: "25%",
      height: getPercent(4, height),
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 5,
      backgroundColor:'#F3F4F6',
      flexDirection:'row'
    },
    calendarBtn:{
      width:getPercent(5,height),
      height:getPercent(5,height),
      borderRadius:100,
      backgroundColor:'#F3F4F6',
      overflow:'hidden',
      alignItems:'center',
      justifyContent:'center'
    }
  });
//container Styles starts here
export const HeaderStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: getPercent(13, height),
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderWidth: 1,
      paddingHorizontal: getPercent(3, width),
      paddingTop: getPercent(4, height),
      borderColor: "#F7F8F8",
    },
  });
