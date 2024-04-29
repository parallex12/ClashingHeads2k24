import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/PrivacySettings/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import SettingSwitchCard from "../../globalComponents/SettingSwitchCard";
import { privacySettingsOptions } from "../../utils";
import { useRecoilState } from "recoil";
import { privacySettingsOptions_atom } from "../../state-management/atoms/atoms";

const PrivacySettings = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [options, setOptions] = useRecoilState(privacySettingsOptions_atom);

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
            <Text style={font(18, "#212225", "Semibold", 2)}>Privacy</Text>
            <Text style={font(14, "#636E72", "Regular", 5, 25)}>
              Set your privacy according to your boundries
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
      </ScrollView>
    </View>
  );
};

export default PrivacySettings;
