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
import { FontAwesome5 } from "@expo/vector-icons";
import { getPercent } from "../middleware";
import MaskedView from "@react-native-masked-view/masked-view";
import { Audio } from "expo-av";

const WaveAudioPlayer = (props) => {
  let { source,iconSize } = props;
  let { width, height } = useWindowDimensions();
  const waveAnime = useRef(new Animated.Value(0)).current;
  const [SoundObj, setSoundObj] = useState(null);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(null);
  let styles = _styles({ width, height });

  const onPlay = async () => {
    if (!source) return alert("Require Source attr.")
    setSoundObj({ isBuffering: true })
    const { sound } = await Audio.Sound.createAsync({ uri: source });
    setSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((onLoad) => {
      let totalDuration = onLoad.durationMillis; // Total duration of the sound
      setSoundObj(onLoad);
      if (onLoad?.didJustFinish) {
        setDuration(0);
        waveAnime.setValue(0);
        setSoundObj(null)
        console.log("yes");
      } else {
        setDuration(totalDuration / 1000);
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
        setSoundObj(null);
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
            size={iconSize|| 20}
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
