import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Notifications/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import NotificationCard from "./components/NotificationCard";
import { getPercent } from "../../middleware";
import useNotifications from "../../Hooks/useNotifications";

const Notifications = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { data } = useNotifications();

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Notifications"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          {data?.map((item, index) => {
            return <NotificationCard key={item?._id} data={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
