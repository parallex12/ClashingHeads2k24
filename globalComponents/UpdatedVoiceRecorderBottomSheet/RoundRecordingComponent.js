import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { font, RoundRecordingComponentStyles } from "../../styles/Global/main";
import CircleComponent from "../../screens/NewPost/components/CircleComponent";
import RecordingPlayer from "../RecordingPlayer";
import { getPercent } from "../../middleware";

const RoundRecordingComponent = (props) => {
  let {
    progress,
    setProgress,
    isRecordingCompleted,
    setIsRecordingCompleted,
    isAudioPlaying,
    setIsAudioPlaying,
    timer,
    setTimer,
    recording,
    setRecording,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = RoundRecordingComponentStyles({ width, height });
  const [sound, setSound] = useState(false);

  let iconImages = [
    require("../../assets/icons/recorderVectorRed.png"),
    require("../../assets/icons/redPlayicon.png"),
    require("../../assets/icons/bgPause.png"),
  ];

  return (
    <View style={styles.container}>
      <CircleComponent
        gap={1}
        size={45}
        progress={progress}
        containerStyles={{
          backgroundColor: "rgba(256,83,74,0.2)",
        }}
        progressColor={
          isRecordingCompleted && !isAudioPlaying ? "#fff" : "#DB2727"
        }
      >
        <CircleComponent
          size={45}
          gap={1.12}
          progress={null}
          containerStyles={{
            backgroundColor: "rgba(256,83,74,0.3)",
          }}
        >
          <RecordingPlayer
            setSound={setSound}
            sound={sound}
            setProgress={setProgress}
            isAudioPlaying={isAudioPlaying}
            source={recording}
            setIsAudioPlaying={setIsAudioPlaying}
            setTimer={setTimer}
          >
            <CircleComponent
              size={45}
              gap={1.3}
              progress={null}
              containerStyles={{
                backgroundColor: "#fff",
              }}
            >
              <Image
                source={
                  isAudioPlaying
                    ? iconImages[0]
                    : isRecordingCompleted
                    ? iconImages[1]
                    : iconImages[0]
                }
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            </CircleComponent>
          </RecordingPlayer>
        </CircleComponent>
      </CircleComponent>
      <View style={styles.textWrapper}>
        <Text style={font(16, `${"#1F2937"}`, "Bold", 5)}>
          {`${timer % 60} secs`}
        </Text>
        <Text style={font(13, `${"#9CA3AF"}`, "Regular", 5)}>
          {isRecordingCompleted
            ? "Confirm your opinion and Post"
            : "Record your max 15-second opinion on this post"}
        </Text>
      </View>
    </View>
  );
};

export default RoundRecordingComponent;