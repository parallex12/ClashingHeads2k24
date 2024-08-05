import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { CalendarBottomSheetStyles, font } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import { useEffect, useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";
import { getPercent } from "../../middleware";
import StandardButton from "../StandardButton";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";

const CalendarBottomSheet = (props) => {
  let { calendarSheetRef, calendarTimeSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = CalendarBottomSheetStyles({ width, height });
  const [selectedDay, setSelectedDay] = useState(null);
  const dispatch=useDispatch()
  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], []);

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          { flex: calendarTimeSheetRef.current ? 0 : 1 },
        ]}
      >
        <BottomSheetModal
          enableContentPanningGesture={false}
          ref={calendarSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
          onChange={(e) => dispatch(onUpdateBottomSheet(e))}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleWrapper}>
              <Text style={font(17, "#000000", "Semibold")}>
                Schedule this Room
              </Text>
            </View>
            <ScrollView>
              <View style={styles.calendarWrapper}>
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDay(day.dateString); // Update selected day
                  }}
                  style={{
                    width: getPercent(100, width),
                  }}
                  markedDates={{
                    [selectedDay]: {
                      selected: true,
                      selectedColor: "#DB2727",
                    },
                  }}
                  theme={{
                    arrowStyle: {
                      paddingHorizontal: getPercent(10, width),
                      marginBottom: 10,
                    },
                    arrowColor: "#DB2727",
                    backgroundColor: "#222",
                    calendarBackground: "#fff",
                    textSectionTitleColor: "#000000",
                    textSectionTitleDisabledColor: "#d9e1e8",
                    selectedDayBackgroundColor: "#00adf5",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#000000",
                    dayTextColor: "#333333",
                    textDisabledColor: "#BDBDBD",
                    dotColor: "#00adf5",
                    selectedDotColor: "#ffffff",
                    disabledArrowColor: "#d9e1e8",
                    monthTextColor: "#DB2727",
                    indicatorColor: "#DB2727",
                    textDayFontFamily: "Regular",
                    textMonthFontFamily: "Semibold",
                    textDayHeaderFontFamily: "Regular",
                    textDayFontSize: 16,
                    textMonthFontSize: 17,
                    textDayHeaderFontSize: 14,
                    "stylesheet.calendar.main": {
                      dayContainer: {
                        flex: 1,
                        padding: 5,
                        paddingHorizontal: getPercent(2, width),
                      },
                      emptyDayContainer: {
                        borderBottomWidth: 1,
                        borderColor: "#E2D370",
                        flex: 1,
                        padding: 5,
                      },
                    },
                  }}
                />
              </View>

              <View style={styles.footerWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    calendarSheetRef.current?.close();
                    calendarSheetRef.current = null;
                  }}
                >
                  <Text style={font(14, "#BDBDBD", "Medium")}>Cancel</Text>
                </TouchableOpacity>
                <StandardButton
                  title="Done"
                  customStyles={{ width: getPercent(25, width) }}
                  onPress={() => {
                    calendarSheetRef.current?.close();
                    calendarSheetRef.current = null;
                    calendarTimeSheetRef.current?.present();
                  }}
                />
              </View>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default CalendarBottomSheet;
