import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/CreateRoom/main";
import Header from "./components/Header";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { getPercent } from "../../middleware";
import { AntDesign, Ionicons, Foundation } from "@expo/vector-icons";
import StandardSwitch from "../../globalComponents/StandardSwitch";
import { useEffect, useRef } from "react";
import CalendarBottomSheet from "../../globalComponents/CalendarBottomSheet/CalendarBottomSheet";
import CalendarTimeBottomSheet from "../../globalComponents/CalendarBottomSheet/CalendarTimeBottomSheet";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateRoom = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const route = useRoute();
  const calendarSheetRef = useRef(null);
  const calendarTimeSheetRef = useRef(null);

  useEffect(() => {
    if (route.params?.monetize_details) {
      const monetize_details = route.params.monetize_details;
      // Handle monetize_details here
      console.log("Received monetize_details :", monetize_details);
    }
  }, [route.params?.monetize_details]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formWrapper}>
        {/* Title input */}
        <View style={styles.formInputcont}>
          <View style={{ flex: 1 }}>
            <Text style={font(14, "#111827", "Medium", 10)}>Clash Title</Text>
            <TextInput
              placeholder="Enter Clash title here..."
              placeholderTextColor="#9CA3AF"
              style={styles.titleInput}
              multiline
            />
          </View>
        </View>
        {/* Title input */}
        {/* Privacy  */}
        <View style={styles.formInputcont2}>
          <Text style={font(14, "#111827", "Medium", 10)}>Privacy</Text>
          <TouchableOpacity style={styles.privacyBtn}>
            <Text style={font(12, "#111827", "Medium", 10)}>Public</Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="#111827"
              style={{
                marginLeft: 8,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Record this Room  */}
        <View style={styles.formInputcont2}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={font(14, "#111827", "Medium", 10)}>
              Record this clashroom
            </Text>
            <AntDesign
              name="infocirlceo"
              size={18}
              color="#DB2727"
              style={{ marginLeft: 10 }}
            />
          </View>
          <StandardSwitch />
        </View>
        {/* Monetize this Room  */}
        <View style={styles.formInputcont2}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={font(14, "#111827", "Medium", 10)}>
              Monetize this clashroom
            </Text>
            <AntDesign
              name="infocirlceo"
              size={18}
              color="#DB2727"
              style={{ marginLeft: 10 }}
            />
          </View>
          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => navigation.navigate("ClashRoomMonetize")}
          >
            <View style={styles.dollarSign}>
              <Foundation
                name="dollar"
                size={getPercent(2.5, height)}
                color="#DB2727"
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Schedule this Room  */}
        <View style={styles.formInputcont2}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={font(14, "#111827", "Medium", 10)}>
              Schedule this clashroom
            </Text>
            <AntDesign
              name="infocirlceo"
              size={18}
              color="#DB2727"
              style={{ marginLeft: 10 }}
            />
          </View>
          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => calendarSheetRef.current?.present()}
          >
            <Ionicons name="calendar-outline" size={24} color="#DB2727" />
          </TouchableOpacity>
        </View>
        <StandardButton
          title="Start Room Now"
          customStyles={{
            width: "50%",
            alignSelf: "center",
            marginTop: getPercent(4, height),
          }}
          onPress={() => {
            navigation.navigate("ClashRoom", { type: "Owner" });
          }}
        />
      </View>
      <CalendarTimeBottomSheet calendarTimeSheetRef={calendarTimeSheetRef} />
      <CalendarBottomSheet
        calendarSheetRef={calendarSheetRef}
        calendarTimeSheetRef={calendarTimeSheetRef}
      />
    </View>
  );
};

export default CreateRoom;
