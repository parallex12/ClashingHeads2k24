import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { RecordingButtonStyles } from "../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const RecordingButton = (props) => {
  let {
    recording,
    setRecording,
    isRecordingCompleted,
    onConfirm,
    isRecording,
    start,
    stop,
  } = props;
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      start();
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    stop();
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecording(uri);
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <TouchableWithoutFeedback
      onPress={
        isRecording
          ? stopRecording
          : isRecordingCompleted
          ? onConfirm
          : startRecording
      }
    >
      {props?.children}
    </TouchableWithoutFeedback>
  );
};

export default RecordingButton;
