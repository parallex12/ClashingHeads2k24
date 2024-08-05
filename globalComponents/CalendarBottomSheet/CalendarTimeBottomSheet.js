import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { CalendarTimeBottomSheetStyles, font } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import { useMemo, useState } from "react";
import { getPercent } from "../../middleware";
import StandardButton from "../StandardButton";
import { useNavigation } from "@react-navigation/native";

const TimeComponent = () => {
  let { width, height } = useWindowDimensions();
  let styles = CalendarTimeBottomSheetStyles({ width, height });
  const [selectedMode, setSelectedMode] = useState("AM");
  let activeStyles = (mode) =>
    selectedMode == mode
      ? styles.am_pm_active_wrapper
      : styles.am_pm_disable_wrapper;

  let activeTextStyles = (mode) =>
    selectedMode == mode
      ? font(12, "#FFFFFF", "Regular")
      : font(12, "#111827", "Regular");

  return (
    <View style={styles.timeComponentWrapper}>
      <View style={styles.hour_minutes_wrapper}>
        <TextInput
          placeholderTextColor="#9CA3AF"
          maxLength={2}
          keyboardType="default"
          placeholder="Hr"
          style={styles.hour_minutes_input_wrapper}
        />
        <Text style={font(13, "#9CA3AF", "Regular")}>:</Text>
        <TextInput
          placeholderTextColor="#9CA3AF"
          placeholder="Min"
          style={styles.hour_minutes_input_wrapper}
        />
      </View>
      <View style={styles.am_pm_wrapper}>
        <TouchableOpacity
          style={activeStyles("AM")}
          onPress={() => setSelectedMode("AM")}
        >
          <Text style={activeTextStyles("AM")}>AM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeStyles("PM")}
          onPress={() => setSelectedMode("PM")}
        >
          <Text style={activeTextStyles("PM")}>PM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CalendarTimeBottomSheet = (props) => {
  let { calendarTimeSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = CalendarTimeBottomSheetStyles({ width, height });
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    from: null,
    to: null,
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const navigation = useNavigation();

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          styles.container,
          { flex: calendarTimeSheetRef.current ? 1 : 0 },
        ]}
      >
        <BottomSheetModal
          ref={calendarTimeSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleWrapper}>
              <Text style={font(17, "#000000", "Semibold", 0, null)}>
                Schedule this Room
              </Text>
            </View>
            <View style={styles.calendarTimeWrapper}>
              <TimeComponent />
              <Text
                style={font(13, "#6B7280", "Regular", 10, null, {
                  paddingHorizontal: getPercent(5, width),
                })}
              >
                To
              </Text>
              <TimeComponent />
            </View>
            <View style={styles.footerWrapper}>
              <TouchableOpacity
                onPress={() => calendarTimeSheetRef.current?.close()}
              >
                <Text style={font(14, "#BDBDBD", "Medium")}>Cancel</Text>
              </TouchableOpacity>
              <StandardButton
                title="Done"
                customStyles={{ width: getPercent(25, width) }}
                onPress={() => {
                  calendarTimeSheetRef.current.close();
                  calendarTimeSheetRef.current = null;
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default CalendarTimeBottomSheet;
