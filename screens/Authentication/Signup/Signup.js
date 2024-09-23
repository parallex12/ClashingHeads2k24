import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { styles as _styles } from "../../../styles/Signin/main";
import { font } from "../../../styles/Global/main";
import CountryCodeField from "../../../globalComponents/CountryCodeField";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AuthenticationApi from "../../../ApisManager/AuthenticationApi";

const Signup = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [country, setCountry] = useState({ dial_code: "+1", flag: "🇺🇸" });
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const AuthApi = new AuthenticationApi();

  const onLogin = () => {
    navigation?.navigate("Signin");
  };

  const onContinue = async () => {
    let phone_number_raw = country?.dial_code + phoneNumber;
    if (!phoneNumber) {
      alert("Phone number required.");
      return;
    }
    setLoading(true);
    await AuthApi.loginWithPhone(phone_number_raw)
      .then((res) => {
        navigation?.navigate("OTPVerification", { phone: phone_number_raw });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
            <View style={styles.logoWrapper}>
              <Image
                source={require("../../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.formWrapper}>
              <Text style={font(25, "#000000", "Semibold", 3)}>Sign Up</Text>
              <Text style={font(14, "#6B7280", "Regular", 5)}>
                Enter Your Phone Number
              </Text>
              <CountryCodeField
                setCountry={setCountry}
                onChangeText={(val) => setPhoneNumber(val)}
              />
              <Text
                style={font(12, "#252525", "Regular", 3, 20, {
                  textAlign: "justify",
                })}
              >
                We will send a text with a verification code. Message and date
                rates may apply, By continuing, you agree to our{" "}
                <Text style={font(12, "#DB2727", "Regular", 3)}>
                  Terms of Services & Privacy Policy.
                </Text>
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
              <Text
                style={font(
                  14,
                  "#252525",
                  "Regular",
                  3,
                  null,
                  styles.signupText
                )}
              >
                Already have an account?{" "}
                <Text
                  onPress={onLogin}
                  style={font(14, "#DB2727", "Medium", 3)}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Signup;
