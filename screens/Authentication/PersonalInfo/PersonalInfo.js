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
import { connect, useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/PersonalInfo/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import {
  getPercent,
  politicsCategory,
  registrationFields,
} from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import StandardInput from "../../../globalComponents/StandardInput";
import {
  update_user_details,
  validate_user_details,
} from "../../../middleware/firebase";
import { Entypo } from "@expo/vector-icons";
import {
  selectAuthUser,
  selectUserForm,
} from "../../../state-management/features/auth";
import auth from "@react-native-firebase/auth";
import { setUserForm } from "../../../state-management/features/auth/authSlice";

const PersonalInfo = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_profile_details = useSelector(selectAuthUser);
  const [form, setForm] = useState(user_profile_details || {});
  const [errorField, setErrorField] = useState({});
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    try {
      setLoading(true);
      validate_user_details(form, user_profile_details)
        .then((res) => {
          setErrorField(null);
          let user_details = {
            ...form,
            hasPersonalInfo: true,
          };
          user_details["dateOfBirth"] = new Date(
            user_details?.dateOfBirth
          ).toISOString();
          update_user_details(user?.uid, user_details)
            .then((res) => {
              dispatch(setUserForm({}));
              if (res?.code == 200) {
                if (!user_profile_details?.hasVoiceAdded) {
                  props?.navigation?.navigate("VoiceRecording");
                } else {
                  props?.navigation?.navigate("Home");
                }
              }
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
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
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
            loading={loading}
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
