import React, { useEffect, useRef, useState } from "react";
import {
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
  let { source } = props;
  let { width, height } = useWindowDimensions();
  const waveAnime = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(null);
  let styles = _styles({ width, height });

  const onPlay = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: source });
    setSound(sound);
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((onLoad) => {
      let totalDuration = onLoad.durationMillis; // Total duration of the sound
      setIsPlaying(onLoad?.isPlaying);
      if (onLoad?.didJustFinish) {
        setDuration(0);
        waveAnime.setValue(0);
        console.log("yes")
      } else {
        setDuration(totalDuration / 1000);
      }
    });
  };

  useEffect(() => {
    if (isPlaying) {
      console.log(duration);
      Animated.timing(waveAnime, {
        toValue: 1,
        duration: duration * 1050, // Adjust the duration as needed
        useNativeDriver: false,
      }).start(() => {
        setIsPlaying(false);
        sound.unloadAsync();
        setShouldPlay(false);
        setDuration(0);
      });
    }
  }, [isPlaying]);

  const wavePosition = waveAnime.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "96%"], // Adjusted to be numeric values
  });

  let animeWidthStyles = [
    styles.waveRedWrapper,
    {
      width:wavePosition,
    },
  ];

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPlay}>
        <FontAwesome5
          name={isPlaying ? "pause" : "play"}
          size={20}
          color="#DB2727"
        />
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
        <Animated.View
          style={animeWidthStyles}
        ></Animated.View>
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
      zIndex:2,
      backgroundColor:'#ffffff'
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
    waveRedWrapper:{
      width: "100%",
      height: "100%",
      backgroundColor: "#DB2727",
    }
  });

export default WaveAudioPlayer;
