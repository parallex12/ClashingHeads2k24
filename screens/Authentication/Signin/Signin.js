import {
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
import { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { _onPhoneAuth } from "../../../middleware/firebase";

const Signin = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [country, setCountry] = useState({ dial_code: "+1", flag: "🇺🇸" });
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [message, setShowMessage] = useState(null);
  const auth = getAuth();
  const recaptchaVerifier = useRef(null);

  let authOptions = {
    auth,
    phoneNumber,
    recaptchaVerifier,
    setShowMessage,
  };

  const onSignup = () => {
    props?.navigation?.navigate("Signup");
  };

  const onContinue = () => {
    let complete_phone_number = { code: country?.dial_code , number: phoneNumber }
    if (!phoneNumber) {
      alert("Phone number required.");
      return;
    }
    console.log(complete_phone_number)
    // props?.navigation?.navigate("Home");
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
            <Text style={font(22, "#000000", "Semibold", 3)}>Sign In</Text>
            <Text style={font(14, "#6B7280", "Regular", 5)}>
              Enter Your Phone Number
            </Text>
            <CountryCodeField
              setCountry={setCountry}
              onChangeText={(val) => setPhoneNumber(val)}
            />
            <Text style={font(10, "#252525", "Regular", 3, 20)}>
              We will send a text with a verification code. Message and date
              rates may apply, By continuing, you agree to our{" "}
              <Text style={font(10, "#DB2727", "Regular", 3)}>
                Terms of Services & Privacy Policy.
              </Text>
            </Text>
            <StandardButton
              title="Continue"
              customStyles={{
                height: getPercent(7, height),
                marginVertical: getPercent(3, height),
              }}
              onPress={onContinue}
            />
            <Text
              style={font(13, "#252525", "Regular", 3, null, styles.signupText)}
            >
              Don’t have an account?{" "}
              <Text onPress={onSignup} style={font(13, "#DB2727", "Medium", 3)}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signin;
