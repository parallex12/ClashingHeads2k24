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
import { Audio } from "expo-av";
import { font } from "../styles/Global/main";
import { download } from "react-native-compressor";

const WaveAudioPlayer = (props) => {
  const {
    source,
    audioResetBtn,
    iconSize,
    showDuration,
    localSource,
    afterAudioPlayed,
    audioResetFunc,
    localAudio,
  } = props;
  const { width, height } = useWindowDimensions();
  const waveAnime = useRef(new Animated.Value(0)).current;
  const soundRef = useRef(null);
  const [soundObj, setSoundObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const styles = _styles({ width, height });
  const [isBuffering, setIsBuffering] = useState(false); // Initialize to true
  const [downloadedAudio, setDownloadedAudio] = useState(null);

  const downloadCompressedAudio = async () => {
    try {
      const downloadFileUrl = await download(source, (progress) => {});
      setDownloadedAudio(downloadFileUrl);
    } catch (e) {
      console.log(e, "issue");
    }
  };

  useEffect(() => {
    if (source && !localAudio) {
      downloadCompressedAudio();
    }
    return () => {
      unloadAudio();
    };
  }, [localSource, source]);

  const loadAudio = async () => {
    try {
      setIsBuffering(true); // Start buffering
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        localSource ? localSource : { uri: downloadedAudio || source },
        { shouldPlay: false }
      );

      soundRef.current = sound;
      setDuration(status.durationMillis / 1000);
      setRemainingTime(status.durationMillis / 1000);
      setIsBuffering(false); // Stop buffering
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate); // Set playback status update handler
    } catch (error) {
      console.log("Error loading audio:", error);
      setIsBuffering(false); // Stop buffering on error
    }
  };
  const onPlay = async () => {
    if (!source && !localSource) return alert("Can't play audio!");
    if (!soundRef.current) {
      await loadAudio();
    }

    try {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        Animated.timing(waveAnime).stop(); // Stop animation when audio is paused
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (e) {
      console.log(e);
      console.log(soundRef);
    }
  };

  const onStop = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      setIsPlaying(false);
      reset();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Start animation when audio playback begins
      waveAnime.setValue(progress);
      Animated.timing(waveAnime, {
        toValue: 1,
        duration: (1 - progress) * duration * 1000,
        useNativeDriver: false,
      }).start();
    } else {
      // Stop animation when audio playback pauses or ends
      waveAnime.stopAnimation();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Reset animation when the component unmounts
    return () => {
      waveAnime.setValue(0);
      waveAnime.stopAnimation();
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error(`FATAL PLAYER ERROR: ${status.error}`);
      }
      return;
    }
    setSoundObj(status);
    if (status.isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    if (status.didJustFinish) {
      resetToInitialState();
      afterAudioPlayed && afterAudioPlayed();
    }

    setProgress(status.positionMillis / status.durationMillis);
    setRemainingTime((status.durationMillis - status.positionMillis) / 1000);
  };

  const resetToInitialState = () => {
    waveAnime.setValue(0);
    setDuration(0);
    setProgress(0);
    setRemainingTime(0);
    setSoundObj(null);
    setIsPlaying(false);
    unloadAudio();
    loadAudio();
  };

  const reset = () => {
    waveAnime.setValue(0);
    setDuration(0);
    setProgress(0);
    setRemainingTime(0);
    setSoundObj(null);
    setIsPlaying(false);
    if (soundRef.current) {
      soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  const unloadAudio = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const wavePosition = waveAnime.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "96%"],
  });

  const animeWidthStyles = [
    styles.waveRedWrapper,
    {
      width: wavePosition,
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={isBuffering ? null : isPlaying ? onStop : onPlay}
      >
        {isBuffering ? (
          <ActivityIndicator />
        ) : (
          <FontAwesome5
            name={isPlaying ? "pause" : "play"}
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
        <Animated.View style={animeWidthStyles}></Animated.View>
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#AEAEAE" }}
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
