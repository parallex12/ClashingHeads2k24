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
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";

const NotificationCard = (props) => {
  let { data, isNew } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let { to, from, message, createdAt } = data;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: !data?.read ? "#F8F8FA" : "#FFFFFF" },
      ]}
    >
      <View style={styles.bellIcon}>
        <ImageViewer
          source={{ uri: from?.profile_photo }}
          resizeMode="contain"
          style={{ width: "60%", height: "60%" }}
        />
      </View>
      <View style={styles.content}>
        <Text style={font(14, "#7D7C7C", "Regular", 2)}>
          <Text style={font(14, "#263238", "Semibold")}>{from?.realName} </Text>
          {message}
        </Text>
        <Text style={font(12, "#4B5563", "Regular", 2)}>
          {formatTime(createdAt)}
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.dotIconBtn}>
        <Entypo name="dots-three-horizontal" size={18} color="#DB2727" />
      </TouchableOpacity> */}
    </View>
  );
};

export default NotificationCard;
