import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { styles as _styles } from "../../../styles/OTPVerification/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useState } from "react";
import PinCodeInput from "../../../globalComponents/PinCodeInput";

const OTPVerification = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [otpCode, setOtpCode] = useState(null);

  let phone = route?.params?.phone;

  const onContinue = () => {
    props?.navigation?.navigate("CommunityGuidelines", {
      phone,
      otpVerified: true,
    });
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
            You will receive your verification code on your given number {phone}
            . If you didn’t get the number then you can change or edit the
            number.{" "}
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

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(OTPVerification);
