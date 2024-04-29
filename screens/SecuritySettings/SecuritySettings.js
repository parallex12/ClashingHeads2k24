import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/SecuritySettings/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import CountryCodeField from "../../globalComponents/CountryCodeField";
import StandardButton from "../../globalComponents/StandardButton";
import { useState } from "react";

const SecuritySettings = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [country, setCountry] = useState(null);
  
  return (
    <View style={styles.container}>
      <StandardHeader
        title="Settings"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <Text style={font(18, "#212225", "Semibold", 2)}>Security</Text>
          <Text style={font(14, "#636E72", "Regular", 5, 25)}>
            To change your phone number you need to get OTP on both numbers
          </Text>
        </View>
        <CountryCodeField
          setCountry={setCountry}
          onChangeText={(val) => console.log(val)}
        />
        <View style={styles.buttonWrapper}>
          <StandardButton
            title="Update"
            customStyles={{ height: getPercent(6, height) }}
          />
        </View>
      </View>
    </View>
  );
};

export default SecuritySettings;
