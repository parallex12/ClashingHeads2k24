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
  bioFields,
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
import {
  setUserDetails,
  setUserForm,
} from "../../../state-management/features/auth/authSlice";
import { update_user } from "../../../state-management/apiCalls/auth";

const AddBio = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user = useSelector(selectAuthUser);
  const [form, setForm] = useState(user);
  const [errorField, setErrorField] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onContinue = async () => {
    try {
      let updateDetails = {
        bio: form?.bio || null,
        school: form?.school || null,
        employment: form?.employment || null,
      };

      setLoading(true)
      update_user(user?._id, updateDetails)
        .then((res) => {
          dispatch(setUserForm({}));
          dispatch(setUserDetails(res));
          if (res) {
            props?.navigation?.navigate("MyProfile");
          }
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
          console.log(e.message);
          alert("Something went wrong try again!");
        });
    } catch (e) {
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
            <Text style={font(20, "#120D26", "Semibold", 3)}>Edit Bio</Text>
            <Text style={font(12, "#4B5563", "Regular", 7)}>
              This will help people understand you better.
            </Text>
            <View style={styles.formWrapper}>
              {bioFields?.map((item, index) => {
                return (
                  <StandardInput
                    multiline={item?.key == "bio"}
                    inputStyles={{
                      borderRadius: 10,
                    }}
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

export default AddBio;
