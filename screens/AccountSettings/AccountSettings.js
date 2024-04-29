import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/AccountSettings/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import SettingsCard from "./components/SettingsCard";
import { settingOptions } from "../../utils";

const AccountSettings = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Settings"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titleWrapper}>
            <Text style={font(18, "#212225", "Semibold", 2)}>
              Account Settings
            </Text>
            <Text style={font(14, "#636E72", "Regular", 5)}>
              Update your info to keep your account secure.
            </Text>
          </View>
          <View style={styles.settingCardWrapper}>
            {settingOptions?.map((item, index) => {
              return <SettingsCard key={index} data={item} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettings;
