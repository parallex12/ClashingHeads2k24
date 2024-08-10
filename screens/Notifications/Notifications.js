import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Notifications/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import NotificationCard from "./components/NotificationCard";
import { getPercent } from "../../middleware";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { useEffect, useState } from "react";

const Notifications = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const currentUser = useSelector(selectAuthUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentUser?.notifications?.length > 0) {
      setNotifications(currentUser?.notifications);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Notifications"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          {notifications?.map((item, index) => {
            return <NotificationCard key={item?._id} data={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
