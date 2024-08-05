import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecordingButtonStyles } from "../styles/Global/main";
import { Audio } from "expo-av";
import { useEffect } from "react";
const RecordingButton = (props) => {
  let {
    recording,
    recordingLimitReached,
    setRecording,
    isRecordingCompleted,
    onConfirm,
    isRecording,
    start,
    stop,
    title,
    customStyles,
    textStyles,
    loading,
    theme,
  } = props;
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  let { width, height } = useWindowDimensions();
  let styles = RecordingButtonStyles({ width, height });

  useEffect(() => {
    const request_permission = async () => {
      await requestPermission();
    };
    request_permission();
  }, []);

  useEffect(() => {
    if (recordingLimitReached) {
      stopRecording();
    }
  }, [recordingLimitReached]);

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
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecording(uri);
    console.log("Recording stopped and stored at", uri);
    stop();
  }

  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={
        loading
          ? null
          : isRecording
          ? stopRecording
          : isRecordingCompleted
          ? onConfirm
          : startRecording
      }
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme ? "#222" : "#fff"} />
      ) : (
        <>
          <Text style={[styles.text, textStyles]}>{title}</Text>
          {props?.children}
        </>
      )}
    </TouchableOpacity>
  );
};

export default RecordingButton;
