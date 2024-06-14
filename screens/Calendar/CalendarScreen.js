import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RFValue, RFValue as rf } from "react-native-responsive-fontsize";
import { styles as _styles } from "../../styles/Calendar/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { Agenda } from "react-native-calendars";
import { calendarTheme } from "./calendarTheme";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const CalendarScreen = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const [items, setItems] = useState({});
  let { routeDate } = props;

  const useFormatDate = (date) => {
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };

  const loadItems = (day) => {
    const newItems = { ...items };

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];

          // Generate items for the day with gaps
          const numItems = 2; // You can adjust this to create more or fewer items
          const appointmentTimes = [10, 14]; // Example times: 10 AM and 2 PM

          for (let j = 0; j < numItems; j++) {
            const hour = appointmentTimes[j % appointmentTimes.length];
            newItems[strTime].push({
              name: `Appointment at ${hour}:00`,
              height: 50,
              day: strTime,
              time: `${hour}:00`,
            });
          }
        }
      }

      setItems(newItems);
    }, 1000);
  };

  const eventItem = (item, index) => {
    return (
      <View style={styles.eventWrapper}>
        <View style={styles.event}>
          <Text style={styles.eventTitle}>This is demo Clash Room Title</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="clock" size={RFValue(9)} color="#6B7280" />
            <Text style={styles.eventTime}>Wed 18 Dec 12:00- 01:00 PM</Text>
          </View>
          <View style={styles.userWrapper}>
            {[1, 2, 3].map((item, index) => {
              let rightSet = index == 0 ? 0 : item * 5;
              return (
                <View
                  style={[styles.useritem, { right: rightSet }]}
                  key={index}
                >
                  <Image
                    source={require("../../assets/dummy/dummyProfile2.png")}
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{
          height: getPercent(15, height),
        }}
        backButton
        title="Calendar"
        searchIcon={true}
        plainBg="#DB2727"
      />
      <View style={styles.content}>
        <Agenda
          style={{
            width: getPercent(100, width),
            height: getPercent(100, height),
          }}
          // testID={testIDs.agenda.CONTAINER}
          items={items}
          loadItemsForMonth={loadItems}
          selected={useFormatDate(new Date())}
          renderItem={eventItem}
          // renderEmptyDate={renderEmptyDate}
          // rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          hideExtraDays={false}
          hideArrows={false}
          renderArrow={(direction) => {
            return direction == "left" ? (
              <View style={styles.arrowLeft}>
                <Entypo name="chevron-thin-left" size={rf(20)} color="#fff" />
              </View>
            ) : (
              <View style={styles.arrowRight}>
                <Entypo name="chevron-thin-right" size={rf(20)} color="#fff" />
              </View>
            );
          }}
          renderDay={(day, item) => {
            return (
              <View style={styles.agendaTimeWrapper}>
                <Text style={styles.agendaTime}>08:00 {"\n"}PM</Text>
                <View style={styles.agendaMiddleIndicator}></View>
              </View>
            );
          }}
          theme={{
            ...calendarTheme,
            calendarBackground: "#DB2727",
            agendaDayTextColor: "#fff",
            agendaDayNumColor: "#fff",
            agendaTodayColor: "#fff",
            agendaKnobColor: "#fff",
          }}
        />
      </View>
    </View>
  );
};

export default CalendarScreen;
