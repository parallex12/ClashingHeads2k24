import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { getPercent } from "../middleware";
import MaskedView from "@react-native-masked-view/masked-view";
import { Audio, InterruptionModeIOS } from "expo-av";
import { font } from "../styles/Global/main";

const WaveAudioPlayer = (props) => {
  let {
    source,
    audioResetBtn,
    iconSize,
    showDuration,
    localSource,
    afterAudioPlayed,
    audioResetFunc,
  } = props;
  let { width, height } = useWindowDimensions();
  const waveAnime = useRef(new Animated.Value(0)).current;
  const [SoundObj, setSoundObj] = useState(null);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  let styles = _styles({ width, height });

  useEffect(() => {
    reset();
    loadAudio();
  }, [localSource, source]);

  const onPlay = async () => {
    if (!source && !localSource) return alert("Require Source attr.");

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
    });

    setSoundObj({ isBuffering: true });
    const { sound } = await Audio.Sound.createAsync(
      localSource ? localSource : { uri: source }
    );
    setSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((onLoad) => {
      let totalDuration = onLoad.durationMillis; // Total duration of the sound
      setSoundObj(onLoad);
      if (onLoad?.didJustFinish) {
        waveAnime.setValue(0);
        setProgress(0);
        setSoundObj(null);
        setSound(null);
        setRemainingTime(0);
        afterAudioPlayed && afterAudioPlayed();
      } else {
        setProgress(onLoad.positionMillis / onLoad.durationMillis);
        setRemainingTime(
          (onLoad.durationMillis - onLoad.positionMillis) / 1000
        );
      }
    });
  };

  const onStop = () => {
    sound.stopAsync();
    setDuration(0);
    setSoundObj(null);
    waveAnime.setValue(0);
  };

  useEffect(() => {
    if (SoundObj?.isPlaying) {
      Animated.timing(waveAnime, {
        toValue: 1,
        duration: duration * 1050, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(() => {
        sound.unloadAsync();
        setDuration(0);
        waveAnime.setValue(0);
        setSoundObj(null);
        setSound(null);
        afterAudioPlayed && afterAudioPlayed();
      });
    }
  }, [SoundObj?.isPlaying]);

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const reset = () => {
    waveAnime.setValue(0);
    setDuration(0);
    setProgress(0);
    setSound(null);
    setSoundObj(null);
    sound?.unloadAsync();
  };

  const loadAudio = async () => {
    if (!source && !localSource) return alert("Require Source attr.");

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
    });

    const { sound } = await Audio.Sound.createAsync(
      localSource ? localSource : { uri: source },
      { shouldPlay: false }
    );
    const status = await sound.getStatusAsync();
    setSound(sound);
    setDuration(status.durationMillis / 1000); // Set the duration in seconds
    setRemainingTime(status.durationMillis / 1000); // Set the remaining time in seconds
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={SoundObj?.isPlaying ? onStop : onPlay}
      >
        {SoundObj?.isBuffering ? (
          <ActivityIndicator />
        ) : (
          <FontAwesome5
            name={SoundObj?.isPlaying ? "pause" : "play"}
            size={iconSize || 20}
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
              resizeMode="cover"
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
      {audioResetBtn && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            audioResetFunc();
            reset();
          }}
        >
          <AntDesign name={"delete"} size={20} color="#DB2727" />
        </TouchableOpacity>
      )}
      {showDuration && (
        <Text style={font(10, "#374151", "Medium")}>
          {remainingTime ? formatDuration(remainingTime) : "0:00"}
        </Text>
      )}
    </View>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      minHeight: getPercent(4, height),
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
      marginRight: 4,
    },
    waveForm: {
      width: "96%",
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
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

export default WaveAudioPlayer;
