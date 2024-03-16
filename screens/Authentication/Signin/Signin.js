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

const Signin = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const onSignup=()=>{
    props?.navigation?.navigate("Signup")
  }

  const onContinue = () => {
    // props?.navigation?.navigate("Dashboard");
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
            <CountryCodeField onChangeText={(val) => console.log(val)} />
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
              <Text onPress={onSignup} style={font(13, "#DB2727", "Medium", 3)}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(Signin);
