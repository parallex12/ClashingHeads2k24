import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { styles as _styles } from "../../../styles/OTPVerification/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import {
  getPercent,
  saveTokenToStorage,
  setAuthToken,
} from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useState } from "react";
import PinCodeInput from "../../../globalComponents/PinCodeInput";
import AuthenticationApi from "../../../ApisManager/AuthenticationApi";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../../ContextProviders/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const OTPVerification = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let { phone } = props?.route?.params;
  const [otpCode, setOtpCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const AuthApi = new AuthenticationApi();
  const { login } = useAuth();

  const onContinue = async () => {
    try {
      if (otpCode?.length != 6) return alert("Invalid OTP.");
      setLoading(true);
      await AuthApi.verifyOtp(phone, otpCode).then(async (res) => {
        if (res.err) throw new Error(res.err);
        if (!res.token) {
          useNavigation().goBack();
          return;
        }
        setLoading(false);
        setAuthToken(res.token);
        await saveTokenToStorage(res.token);
        login(); //Context Provider for AUTH
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <BackButton />
            <View style={styles.formWrapper}>
              <Text style={font(25, "#000000", "Semibold", 3)}>
                Verification Code
              </Text>
              <Text style={font(14, "#6B7280", "Regular", 5)}>
                Please enter 6 digit code
              </Text>
              <PinCodeInput setOtpCode={setOtpCode} />
            </View>
            <Text style={font(12, "#252525", "Regular", 3, 20)}>
              You will receive your verification code on your given number{" "}
              {phone}. If you didn’t get the number then you can change or edit
              the number.{" "}
              <Text style={font(12, "#8E70F5", "Regular", 3)}>Change</Text>
            </Text>
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
    </View>
  );
};

export default OTPVerification;
