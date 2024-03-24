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
import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const RecordingPlayer = (props) => {
  let {
    sound,
    setSound,
    source,
    setTimer,
    setProgress,
    setIsAudioPlaying,
    isAudioPlaying,
  } = props;

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: source });
    setSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((onLoad) => {
      let totalDuration = onLoad.durationMillis; // Total duration of the sound
      let currentProgress = onLoad.positionMillis; // Current position of playback
      let isPlaying = onLoad.isPlaying; // Whether the sound is currently playing or paused
      // Update the progress bar
      let progressPercentage = (currentProgress / totalDuration) * 100;
      setProgress(progressPercentage);
      // Update the timer
      let remainingTime = totalDuration - currentProgress;
      let minutes = Math.floor(remainingTime / 60000);
      let seconds = ((remainingTime % 60000) / 1000).toFixed(0);
      let totalDurationSeconds = ((totalDuration % 60000) / 1000).toFixed(0);
      // Update the timer
      setTimer(seconds);

      // Update state to reflect whether the sound is playing or not
      setIsAudioPlaying(isPlaying);
     
    });
  }

  async function stopSound() {
    await sound.pauseAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity onPress={isAudioPlaying ? stopSound : playSound}>
      {props?.children}
    </TouchableOpacity>
  );
};

export default RecordingPlayer;
