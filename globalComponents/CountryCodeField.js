import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { CountryCodeFieldStyles } from "../styles/Global/main";
import { CountryPicker } from "react-native-country-codes-picker";
import { View } from "react-native";
import { useState } from "react";
import { getPercent } from "../middleware";

const CountryCodeField = (props) => {
  let { customStyles, onChangeText, setCountry } = props;
  let { width, height } = useWindowDimensions();
  let styles = CountryCodeFieldStyles({ width, height });
  const [show, setShow] = useState(false);
  const [countryDetails, setCountryDetails] = useState({
    dial_code: "+1",
    flag: "🇺🇸",
  });

  return (
    <View style={[styles.container, customStyles]}>
      <TouchableOpacity
        style={styles.codePickerWrapper}
        onPress={() => setShow(true)}
      >
        <Text
          style={styles.codeText}
        >{`${countryDetails?.flag} ${countryDetails?.dial_code}`}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.inputField}
        placeholder="Phone Number"
        placeholderTextColor="#74737A"
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      {/* // For showing picker just put show state to show prop */}
      <CountryPicker
        style={{
          modal: {
            height: getPercent(70, height),
          },
        }}
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryDetails(item);
          setCountry({ dial_code: item?.dial_code, flag: item?.flag });
          setShow(false);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default CountryCodeField;
