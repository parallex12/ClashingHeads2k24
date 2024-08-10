import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { NotificationCardStyles as _styles } from "../../../styles/Notifications/main";
import { Entypo } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { formatTime } from "../../../middleware";

const NotificationCard = (props) => {
  let { data, isNew } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let { origin, message, createdAt } = data;
  let title = origin?.type == "App" ? "Clashing Heads" : null;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isNew ? "#F8F8FA" : "#FFFFFF" },
      ]}
    >
      <View style={styles.bellIcon}>
        <Image
          source={require("../../../assets/icons/notificationWhite.png")}
          resizeMode="contain"
          style={{ width: "60%", height: "60%" }}
        />
      </View>
      <View style={styles.content}>
        <Text style={font(16, "#7D7C7C", "Regular", 2)}>
          <Text style={font(16, "#263238", "Semibold")}>{title} </Text>
          {message}
        </Text>
        <Text style={font(13, "#4B5563", "Regular", 5)}>
          {formatTime(createdAt)}
        </Text>
      </View>
      <TouchableOpacity style={styles.dotIconBtn}>
        <Entypo name="dots-three-horizontal" size={18} color="#DB2727" />
      </TouchableOpacity>
    </View>
  );
};

export default NotificationCard;
