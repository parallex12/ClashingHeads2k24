import React, { useRef, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { PinCodeInputStyles } from "../styles/Global/main";

const PinCodeInput = (props) => {
  const { customStyles, setOtpCode } = props;
  const { width, height } = useWindowDimensions();
  const styles = PinCodeInputStyles({ width, height });
  const pinInputs = useRef([]);
  const optLimit = new Array(6).fill(null);

  const [otpCode, setOtpCodeLocal] = useState("");

  useEffect(() => {
    // Call the setOtpCode function whenever otpCode changes
    setOtpCode(otpCode);
  }, [otpCode, setOtpCode]);

  const focusNextInput = (index) => {
    if (index < pinInputs.current.length - 1) {
      pinInputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      pinInputs.current[index - 1].focus();
    }
  };

  const handleChangeText = (text, index) => {
    const newOtpCode = otpCode.slice(0, index) + text + otpCode.slice(index + 1);

    setOtpCodeLocal(newOtpCode);
    setOtpCode(newOtpCode);

    if (text && index < pinInputs.current.length - 1) {
      focusNextInput(index);
    }
  };

  return (
    <View style={[styles.otpCompWrapper, customStyles]}>
      {optLimit.map((item, index) => (
        <View style={styles.otpComp} key={index}>
          <TextInput
            style={styles.otp_input}
            maxLength={1}Community Guidelines
            keyboardType="numeric"
            onChangeText={(text) => handleChangeText(text, index)}
            ref={(ref) => (pinInputs.current[index] = ref)}
            autoFocus={index === 0 ? true : false}
            value={otpCode[index]}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && !otpCode[index]) {
                // Handle backspace when the input field is empty
                focusPreviousInput(index);
              }
            }}
          />
        </View>
      ))}
    </View>
  );
};


export default PinCodeInput
