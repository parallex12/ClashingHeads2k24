import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/NotificationSettings/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import SettingSwitchCard from "../../globalComponents/SettingSwitchCard";
import { useState } from "react";
import { notificationSettingsOptions } from "../../utils";

const NotificationSettings = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [options, setOptions] = useState(notificationSettingsOptions);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Settings"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <Text style={font(18, "#212225", "Semibold", 2)}>Notifications</Text>
          <Text style={font(14, "#636E72", "Regular", 5, 25)}>
            Update your notifications settings
          </Text>
        </View>
        <View style={styles.optionsWrapper}>
          {options?.map((item, index) => {
            return (
              <SettingSwitchCard
                data={item}
                key={index}
                on_toggle_Switch={() => {
                  const updatedOptions = [...options]; // Create a copy of the options array
                  updatedOptions[index] = {
                    ...item,
                    isEnabled: !item.isEnabled,
                  }; // Toggle isEnabled property
                  setOptions(updatedOptions); // Update the state with the modified array
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default NotificationSettings;
