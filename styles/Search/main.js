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
      marginVertical: 10,
    },
    clashesCardCont: {
      width: "100%",
      minHeight: getPercent(15, height),
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      paddingTop: 10,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    clashesCardTitle: font(16, "#1F2937", "Medium", 5),
    clashesCardUsersCont: {
      flex: 1,
      paddingVertical: 10,
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
      borderWidth: 1,
    },
    clashUserProfile: {
      width: getPercent(15, width),
      height: getPercent(15, width),
      borderRadius: 100,
      borderWidth: 1,
      marginVertical: 4,
    },
    cardFooterWrapper: {
      width: "100%",
      height: getPercent(4, height),
      borderTopWidth: 1,
      borderColor: "#E5E7EB",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

//PostsResult  starts here
export const PostsResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

//PeopleResultStyles  starts here
export const PeopleResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

//NewsResultStyles  starts here
export const NewsResultStyles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
