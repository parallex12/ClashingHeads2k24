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
import { styles as _styles } from "../../../styles/PersonalInfo/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useState } from "react";

const PersonalInfo = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [otpCode, setOtpCode] = useState(null);

  const onContinue = () => {
    console.log(otpCode);
    props?.navigation?.navigate("PersonalInfo");
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
            <Text style={font(20, "#120D26", "Semibold", 3)}>
              Personal Info
            </Text>
            <Text style={font(12, "#4B5563", "Regular", 7)}>
              This will help us to create your profile
            </Text>
          </View>
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
export default connect(mapStateToProps, {})(PersonalInfo);
