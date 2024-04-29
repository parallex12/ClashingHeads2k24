import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/EditPersonalInformation/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { font } from "../../styles/Global/main";
import StandardInput from "../../globalComponents/StandardInput";
import { getPercent, registrationFields } from "../../middleware";
import { useState } from "react";
import StandardButton from "../../globalComponents/StandardButton";

const EditPersonalInformation = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [form, setForm] = useState({});

  const onChangeText = (val, info) => {
    let { key } = info;
    setForm((prev) => {
      return { ...prev, [key]: val };
    });
  };

  const onRemoveField = (key) => {
    setForm((prev) => {
      return { ...prev, [key]: null };
    });
  };

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
              Personal Information
            </Text>
            <Text style={font(14, "#636E72", "Regular", 5, 25)}>
              Update your info
            </Text>
            <View style={styles.formWrapper}>
              {registrationFields?.map((item, index) => {
                return (
                  <StandardInput
                    value={form[item["key"]]}
                    key={index}
                    data={item}
                    onChangeText={(val) => onChangeText(val, item)}
                    onRemoveField={onRemoveField}
                  />
                );
              })}
            </View>
            <View style={styles.buttonWrapper}>
              <StandardButton
                title="Update"
                customStyles={{ height: getPercent(6, height) }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPersonalInformation;
