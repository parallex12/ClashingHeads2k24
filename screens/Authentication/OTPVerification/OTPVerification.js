import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/OTPVerification/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import PinCodeInput from "../../../globalComponents/PinCodeInput";
import { selectUserForm } from "../../../state-management/features/auth";
import { loginSuccess, setUserForm } from "../../../state-management/features/auth/authSlice";
import { startLoading, stopLoading } from "../../../state-management/features/screen_loader/loaderSlice";
import auth from "@react-native-firebase/auth";

const OTPVerification = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [otpCode, setOtpCode] = useState(null);
  const dispatch = useDispatch()
  const form = useSelector(selectUserForm)
  const [confirm, setConfirm] = useState(null)

  async function signInWithPhoneNumber(phoneNumber) {
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((res) => {
        setConfirm(res)
        dispatch(stopLoading())
      })
      .catch((e) => {
        console.log(e);
        dispatch(stopLoading())
        alert("Something went wrong try again!");
      });
  }


  useEffect(() => {
    if(!form?.phone)return
    console.log("Sending otp to...", form?.phone)
    signInWithPhoneNumber(form?.phone)
  }, [])



  const onContinue = async () => {
    if (!confirm) return
    try {
      if (otpCode?.length != 6) return alert("Invalid OTP.");
      dispatch(startLoading())
      await confirm.confirm(otpCode)
        .then(async (res) => {
          dispatch(loginSuccess())
          dispatch(stopLoading())
        })
        .catch((e) => {
          console.log("e", e);
          dispatch(stopLoading())
          alert("Something went wrong try again!");
        });
    } catch (error) {
      console.log(error)
      console.log("Invalid code.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <BackButton />
          <View style={styles.formWrapper}>
            <Text style={font(22, "#000000", "Semibold", 3)}>
              Verification Code
            </Text>
            <Text style={font(14, "#6B7280", "Regular", 5)}>
              Please enter 6 digit code
            </Text>
            <PinCodeInput setOtpCode={setOtpCode} />
          </View>
          <Text style={font(10, "#252525", "Regular", 3, 20)}>
            You will receive your verification code on your given number{" "}
            {form?.phone}. If you didn’t get the number then you can change or
            edit the number.{" "}
            <Text style={font(10, "#8E70F5", "Regular", 3)}>Change</Text>
          </Text>
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
    </View>
  );
};

export default OTPVerification
