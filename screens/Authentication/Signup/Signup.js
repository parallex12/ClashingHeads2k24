import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../../styles/Signin/main";
import { font } from "../../../styles/Global/main";
import CountryCodeField from "../../../globalComponents/CountryCodeField";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { registrationForm } from "../../../state-management/atoms/atoms";
import auth from "@react-native-firebase/auth";

const Signup = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useRecoilState(registrationForm);
  const [country, setCountry] = useState({ dial_code: "+1", flag: "🇺🇸" });

  const onLogin = () => {
    props?.navigation?.navigate("Signin");
  };

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then((res) => {
        setLoading(false);
        props?.navigation?.navigate("OTPVerification", { confirm: res });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        alert("Something went wrong try again!");
      });
  }

  const onContinue = () => {
    let phone_number_raw = country?.dial_code + form?.phone ;
    if (!phone_number_raw) {
      alert("Phone number required.");
      return;
    }
    setLoading(true);
    signInWithPhoneNumber(phone_number_raw);
  };

  return (
    <View style={styles.container}>
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
            <Text style={font(22, "#000000", "Semibold", 3)}>Sign Up</Text>
            <Text style={font(14, "#6B7280", "Regular", 5)}>
              Enter Your Phone Number
            </Text>
            <CountryCodeField
              setCountry={setCountry}
              onChangeText={(val) => setForm({ phone: val })}
            />
            <Text style={font(10, "#252525", "Regular", 3, 20)}>
              We will send a text with a verification code. Message and date
              rates may apply, By continuing, you agree to our{" "}
              <Text style={font(10, "#DB2727", "Regular", 3)}>
                Terms of Services & Privacy Policy.
              </Text>
            </Text>
            <StandardButton
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Continue"
                )
              }
              customStyles={{
                height: getPercent(7, height),
                marginVertical: getPercent(3, height),
              }}
              onPress={onContinue}
            />
            <Text
              style={font(13, "#252525", "Regular", 3, null, styles.signupText)}
            >
              Already have an account?{" "}
              <Text onPress={onLogin} style={font(13, "#DB2727", "Medium", 3)}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
