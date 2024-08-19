import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      paddingHorizontal: getPercent(5, width),
    },
    content: {
      flex: 1,
      paddingTop: getPercent(7, height),
    },
    headerActionWrapper:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    formWrapper: {
      width: "100%",
      flex: 1,
      paddingTop: getPercent(2, height),
    },
    profileCont:{
      width: "100%",
      flex: 1,
      paddingTop: getPercent(2, height),
      justifyContent: "center",
      alignItems: "center",
      padding: getPercent(4, height),
    },
    profileWrapper: {
     width:getPercent(35,height),
     height:getPercent(35,height),
     borderRadius:getPercent(35,height),
     overflow:'hidden',
     alignItems:'center',
     justifyContent:'center'
    },
    imageActionsItem: {
      width: "100%",
      borderRadius: 100,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      position:'absolute',
      zIndex:99999999
    },
    profile: {
      width: "100%",
      height: "100%",
    },
    actionWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    take_a_photo_btn: {
      width: getPercent(43, width),
      height: getPercent(7, height),
      marginVertical: getPercent(3, height),
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#DB2727",
    },
    upload_btn: {
      width: getPercent(43, width),
      height: getPercent(7, height),
      marginVertical: getPercent(3, height),
    },
    continueBtnWrapper:{
      position:'absolute',
      bottom:0,
      alignSelf:'center'
    }
  });
