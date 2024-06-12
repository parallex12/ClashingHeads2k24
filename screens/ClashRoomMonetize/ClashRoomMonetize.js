import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ClashRoomMonetize/main";
import Header from "./components/Header";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { getPercent, registrationFields } from "../../middleware";
import { useNavigation } from "@react-navigation/native";
import StandardInput from "../../globalComponents/StandardInput";
import { useState } from "react";

const ClashRoomMonetize = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const [form, setForm] = useState({});
  const fields = [
    {
      title: "Charges per participant",
      key: "price_per_user",
      placeholder: "$2",
      type: "text",
    },
    {
      title: "Featured participants share",
      key: "featured_user_share",
      placeholder: "10%",
      type: "text",
    },
  ];

  const onChangeText = (val, info) => {
    let { key } = info;
    setForm((prevForm) => ({ ...prevForm, [key]: val }));
  };

  const onRemoveField = (key) => {
    setForm((prevForm) => {
      const newForm = { ...prevForm };
      delete newForm[key];
      return newForm;
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formWrapper}>
        {/* Title input */}
        {fields?.map((item, index) => {
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
        <Text style={font(11, "#6B7280", "Regular", 10)}>
          Note: Revenue of this clashroom is distributed to Clashingheads, which
          shares revenue with the host and participants if eligible.
        </Text>
      </View>
      <StandardButton
        title="Save"
        customStyles={{
          width: "90%",
          height: getPercent(6, height),
          alignSelf: "center",
          marginTop: getPercent(4, height),
        }}
        onPress={() => {
          navigation.goBack({ monetize_details: form });
        }}
      />
    </View>
  );
};

export default ClashRoomMonetize;
