import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Notifications/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import NotificationCard from "./components/NotificationCard";
import { getPercent } from "../../middleware";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const Notifications = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
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
