import { RFValue as rf } from "react-native-responsive-fontsize";

export const calendarTheme = {
  backgroundColor: "#DB2727",
  calendarBackground: "#fff",
  agendaBackground: "#fff",
  textSectionTitleColor: "#fff",
  textSectionTitleDisabledColor: "#d9e1e8",
  selectedDayBackgroundColor: "#fff",
  selectedWeekDayBackgroundColor: "#fff",
  selectedDayTextColor: "#222",
  todayTextColor: "#fff",
  dayTextColor: "#fff",
  textDisabledColor: "#c5c5c5",
  dotColor: "transparent",
  selectedDotColor: "red",
  disabledArrowColor: "#d9e1e8",
  monthTextColor: "#fff",
  indicatorColor: "#fff",
  textDayFontFamily: "Medium",
  textMonthFontFamily: "Regular",
  textDayHeaderFontFamily: "Regular",
  textDayFontSize: rf(10),
  textMonthFontSize: rf(10),
  textDayHeaderFontSize: rf(10),
  "stylesheet.calendar.main": {
    dayContainer: {
      // borderBottomWidth: 1,
      borderColor: "#fff",
      // flex: 1,
    },
    emptyDayContainer: {
      // borderBottomWidth: 1,
      borderColor: "#fff",
      
      // flex: 1,
      // padding:5
    },
  },
  "stylesheet.calendar.header": {
    week: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent:'space-between',
      color:'#fff'
    },
  },
  "stylesheet.agenda.main": {
    reservations: {
      backgroundColor: "#fff",
      marginTop: 120,
    },
  },
};
