import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/PersonalInfo/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { bioFields, getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import StandardInput from "../../../globalComponents/StandardInput";
import { Entypo } from "@expo/vector-icons";
import UserApi from "../../../ApisManager/UserApi";
import { useQueryClient } from "react-query";

const AddBio = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const user = userDataCached?.user;
  const [form, setForm] = useState(user);
  const [errorField, setErrorField] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userApi = new UserApi();

  const onContinue = async () => {
    try {
      let updateDetails = {
        bio: form?.bio || null,
        school: form?.school || null,
        employment: form?.employment || null,
      };
      setLoading(true);
      let result = await userApi.updateUserProfile(user?._id, updateDetails);
      if (result?.user?._id) {
        alert("Updated");
      }
      props?.navigation?.navigate("MyProfile");
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("Something went wrong try again!");
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
            <Text style={font(23, "#120D26", "Semibold", 3)}>Edit Bio</Text>
            <Text style={font(15, "#4B5563", "Regular", 7)}>
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
