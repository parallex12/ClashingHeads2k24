import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { RecordingButtonStyles } from "../styles/Global/main";
import { Audio } from "expo-av";
import { styles } from "../styles/Home/main";
const RecordingButton = (props) => {
  let {
    recording,
    setRecording,
    isRecordingCompleted,
    onConfirm,
    isRecording,
    start,
    stop,
    title,
    customStyles,
    textStyles
  } = props;
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  let { width, height } = useWindowDimensions();
  let styles = RecordingButtonStyles({ width, height });
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
    <TouchableOpacity
    style={[styles.container, customStyles]}
      onPress={
        isRecording
          ? stopRecording
          : isRecordingCompleted
          ? onConfirm
          : startRecording
      }
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
      {props?.children}
    </TouchableOpacity>
  );
};

export default RecordingButton;
