import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../../styles/PersonalInfo/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent, registrationFields } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import StandardInput from "../../../globalComponents/StandardInput";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  registrationForm,
  screen_loader,
  user_auth,
} from "../../../state-management/atoms/atoms";
import {
  update_user_details,
  validate_user_details,
} from "../../../middleware/firebase";
import { Entypo } from "@expo/vector-icons";

const PersonalInfo = (props) => {
  let { route } = props;
  let { prevData } = { name: "ella" };
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [form, setForm] = useRecoilState(registrationForm);
  const [loading, setLoading] = useRecoilState(screen_loader);
  const [errorField, setErrorField] = useState({});
  const user = useRecoilValue(user_auth);

  const onContinue = async () => {
    setLoading(true);
    validate_user_details(form)
      .then((res) => {
        setErrorField(null);
        let user_details = {
          ...form,
          hasPersonalInfo: true,
        };
        update_user_details(user?.uid, user_details)
          .then((res) => {
            setForm({});
            props?.navigation?.navigate("VoiceRecording");
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e.message);
            alert("Something went wrong try again!");
          });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        if (e?.field) {
          setErrorField(e?.field);
          alert(e?.msg);
          return;
        }
        alert("Something went wrong try again!");
      });
  };

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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <BackButton />
          <View style={styles.formWrapper}>
            <Text style={font(20, "#120D26", "Semibold", 3)}>
              Personal Info
            </Text>
            <Text style={font(12, "#4B5563", "Regular", 7)}>
              This will help us to create your profile
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
                    customIcon={
                      item?.key == errorField ? (
                        <Entypo name="cross" size={20} color="#DB2727" />
                      ) : null
                    }
                  />
                );
              })}
            </View>
          </View>
          <StandardButton
            title="Continue"
            customStyles={{
              height: getPercent(7, height),
              marginVertical: getPercent(3, height),
            }}
            onPress={onContinue}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfo;
