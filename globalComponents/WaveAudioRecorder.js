import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getPercent } from "../middleware";
import MaskedView from "@react-native-masked-view/masked-view";
import { Audio } from "expo-av";

const WaveAudioRecorder = (props) => {
  let { setRecordedVoice, setRecordingDuration } = props
  const { width, height } = useWindowDimensions();
  const waveAnime = useRef(new Animated.Value(0)).current;
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const maxDuration = 3000; // 15 seconds
  const styles = _styles({ width, height });

  const startRecording = async () => {
    try {
      setIsRecording(true);

      await Audio.requestPermissionsAsync();
      console.log("Requesting permissions..");

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { ios, android } =
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY ||
        Audio.RecordingOptionsPresets.HIGH_QUALITY;


      const recordingInstance = new Audio.Recording();
      const recordingOptions = {
        android: android,
        ios: {
          ...ios,
          extension: ".mp4",
          outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
        },
      };

      await recordingInstance.prepareToRecordAsync(recordingOptions);

      recordingInstance.setOnRecordingStatusUpdate(({ durationMillis }) => {
        setDuration(durationMillis);
        setRecordingDuration(durationMillis)
        const animationProgress = durationMillis / maxDuration;
        waveAnime.setValue(animationProgress);
        // Check if the duration has exceeded the maximum duration
        if (durationMillis >= maxDuration) {
          stopRecording(); // Automatically stop recording
          console.log("heyyy staaaaaaapppppp")
        }
      });

      await recordingInstance.startAsync();
      setRecording(recordingInstance);

    } catch (error) {
      console.error("Failed to start recording", error);
      setIsRecording(false);
      setRecording(null)
      setRecordedVoice(null)
      setDuration(0)
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    console.log(recording)
    if (recording) {
      console.log("hellowww")
      try {
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        setRecordedVoice(recording)
        setRecordingDuration(duration)

        setRecording(null);
        waveAnime.stopAnimation();
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  };



  const wavePosition = waveAnime.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "96%"], // Adjusted to be numeric values
  });

  let animeWidthStyles = [
    styles.waveRedWrapper,
    {
      width: wavePosition,
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <FontAwesome5
            name="stop"
            size={20}
            color="#DB2727"
          />
        ) : (
          <FontAwesome5
            name="microphone"
            size={20}
            color="#DB2727"
          />
        )}
      </TouchableOpacity>
      <MaskedView
        style={{ flex: 1, flexDirection: "row", height: "100%" }}
        maskElement={
          <View style={styles.waveForm}>
            <Image
              source={require("../assets/icons/post_cards/audioWave.png")}
              style={styles.waveimg}
              resizeMode="contain"
            />
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <Animated.View style={animeWidthStyles}></Animated.View>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#AEAEAE",
          }}
        ></View>
      </MaskedView>
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(6, height),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#E5E7EB",
      paddingHorizontal: 5,
      zIndex: 2,
      backgroundColor: "#ffffff",
      marginVertical: getPercent(1, height),
    },
    btn: {
      width: "10%",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 2,
    },
    waveForm: {
      width: "96%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      height: 40, // Adjust height as needed
    },
    waveimg: {
      width: "100%",
      height: "100%",
    },
    waveRedWrapper: {
      width: "100%",
      height: "100%",
      backgroundColor: "#DB2727",
    },
  });

export default WaveAudioRecorder;
