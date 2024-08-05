import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecieverMessagestyles as _styles } from "../../../styles/Global/main";
import { formatTime } from "../../../middleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const RecieverMessage = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let time = formatTime(data?.createdAt);

  return (
    <>
      <View style={styles.infoWrapper}>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{data?.message}</Text>
      </View>
    </>
  );
};

export default RecieverMessage;
