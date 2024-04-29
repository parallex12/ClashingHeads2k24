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

const Notifications = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Notifications"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          <NotificationCard />
          <NotificationCard isNew />
          <NotificationCard isNew />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard isNew />
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default Notifications;
