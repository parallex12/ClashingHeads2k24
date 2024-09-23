import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../../styles/PersonalInfo/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent, registrationFields } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useState } from "react";
import StandardInput from "../../../globalComponents/StandardInput";
import { Entypo } from "@expo/vector-icons";
import UserApi from "../../../ApisManager/UserApi";
import useUserProfile from "../../../Hooks/useUserProfile";
import { useQueryClient } from "react-query";
import { validate_user_details } from "../../../utils/validators";

const PersonalInfo = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [loading, setLoading] = useState(false);
  const userProfile = useUserProfile();
  const user_profile_details = userProfile?.data?.user;
  const [form, setForm] = useState(user_profile_details);
  const [errorField, setErrorField] = useState({});
  const { updateUserProfile } = new UserApi();
  let userDbId = user_profile_details?._id;
  const queryClient = useQueryClient();

  const onContinue = async () => {
    try {
      // Check if the user is under 18
      const today = new Date();
      const birthDate = new Date(form?.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        alert("You must be at least 18 years old to sign up.");
        return;
      }
      let isValidated = await validate_user_details(form, user_profile_details);
      if (isValidated?.code != 200) {
        if (isValidated.field) {
          setErrorField(isValidated.field);
          alert(isValidated.msg);
          return;
        }
        alert("Something went wrong try again!");
      }
      let user_details = {
        ...form,
        hasPersonalInfo: true,
      };
      delete user_details["_id"];
      user_details["dateOfBirth"] = new Date(
        user_details?.dateOfBirth
      ).toISOString();
      setLoading(true);
      let result = await updateUserProfile(userDbId, user_details);
      await queryClient.invalidateQueries({
        queryKey: ["currentUserProfile"],
        stale: true,
        refetchPage: true,
        exact: true,
      });
      queryClient.setQueryData("currentUserProfile", { user: result?.user });
      if (!result?.user?.hasVoiceAdded) {
        props?.navigation?.navigate("VoiceRecording");
        return;
      }
      props?.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });

      (await userProfile.refetch()).isFetched && setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
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
