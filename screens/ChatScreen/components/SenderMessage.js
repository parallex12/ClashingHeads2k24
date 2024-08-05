import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SenderMessagestyles as _styles } from "../../../styles/Global/main";
import { formatTime } from "../../../middleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
const SenderMessage = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let time = formatTime(data?.createdAt);
  return (
    <>
      <View style={styles.infoWrapper}>
        <Text style={styles.time}>{time}</Text>
        {data?.status == "sending" ? (
          <MaterialIcons name="timelapse" size={RFValue(12)} color="grey" />
        ) : data?.status == "delivered" ? (
          <Ionicons
            name="checkmark-done"
            size={RFValue(12)}
            color={data?.read ? "blue" : "grey"}
          />
        ) : (
          <MaterialIcons name="error" size={RFValue(12)} color="#DB2727" />
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{data?.message}</Text>
      </View>
    </>
  );
};

export default SenderMessage;
