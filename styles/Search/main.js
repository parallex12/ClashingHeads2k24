import { Platform, StatusBar, StyleSheet } from "react-native";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { getPercent } from "../../middleware";
import { font } from "../Global/main";

//container Styles starts here
export const styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: StatusBar.currentHeight + getPercent(6, height),
    },
    resultCardWrapper: {
      flex: 1,
      paddingBottom: getPercent(2, height),
      paddingHorizontal: getPercent(3, width),
    },
  });

//ClashesResult Styles starts here
export const ClashesResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerCont: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
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
    },
    clashesCardTitle: font(16, "#1F2937", "Medium", 5),
    clashesCardUsersCont: {
      flex: 1,
      marginVertical: getPercent(2, height),
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: getPercent(2, width),
    },
    clashUserItem: {
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
    requetBtn: {
      minWidth: getPercent(22, width),
      height: getPercent(7, width),
      flexDirection: "row",
      paddingHorizontal: 10,
      alignItems: "center",
      justifyContent: "space-around",
    },
    requetBtnText: {
      fontSize: rf(13),
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
      justifyContent: "center",
      padding: 10,
    },
    cardFooterItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
    },
    vsText: {
      fontSize: rf(28),
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
    },
    votingItemText: {
      fontSize: rf(11),
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
    },
    votingItemTextOpponent: {
      fontSize: rf(11),
      fontFamily: "Regular",
      color: "#000000",
    },
  });

//PostsResult  starts here
export const PostsResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    headerCont: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    content: {
      flex: 1,
      paddingTop: getPercent(1, height),
      zIndex: 9,
      paddingBottom: getPercent(12, height),
    },
  });

//PeopleResultStyles  starts here
export const PeopleResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {},
  });

//NewsResultStyles  starts here
export const NewsResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerCont: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
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

//headerStyles starts here
export const headerStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(14, height),
      paddingBottom: getPercent(2, height),
      borderBottomWidth: 1,
      borderColor: "#F7F8F8",
    },
    searchRow: {
      width: "100%",
      height: getPercent(8, height),
      flexDirection: "row",
      alignItems: "center",
    },
    searchInputWrapper: {
      flex: 0.92,
      height: getPercent(5, height),
      backgroundColor: "#F6F7F8",
      borderRadius: 100,
      paddingHorizontal: getPercent(3, width),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
    },
    filtersWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: getPercent(3, width),
    },
    filterItem: {
      paddingHorizontal: getPercent(6, width),
      height: getPercent(5, height),
      borderRadius: 100,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#F3F4F6",
    },
  });
