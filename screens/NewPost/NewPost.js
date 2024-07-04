import {
  Animated,
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/NewPost/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { RFValue } from "react-native-responsive-fontsize";
import CircleComponent from "./components/CircleComponent";
import { getPercent } from "../../middleware";
import RecordingPlayer from "../../globalComponents/RecordingPlayer";
import RecordingButton from "../../globalComponents/RecordingButton";
import { Audio } from "react-native-compressor";

const NewPost = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [sound, setSound] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [recording, setRecording] = useState(false);
  const timerRef = useRef(null);
  const [recordingLimitReached, setrecordingLimitReached] = useState(false);

  let iconImages = [
    require("../../assets/icons/recorderVectorRed.png"),
    require("../../assets/icons/bgPlay.png"),
    require("../../assets/icons/bgPause.png"),
  ];
  // Animation value for background color transition
  const backgroundColor = useRef(new Animated.Value(0)).current;

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setTimer(0);
      setProgress(0);
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 15) {
            setrecordingLimitReached(true);
            return prevTimer;
          }
          return prevTimer + 1;
        });
        setProgress((prevProgress) => {
          if (prevProgress >= 100) return 100;
          return prevProgress + 100 / 15;
        });
      }, 1000);
    } catch (error) {
      console.log("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsRecordingCompleted(true);
      clearInterval(timerRef.current);
      // Trigger background color transition
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 500, // transition duration
        useNativeDriver: false,
      }).start();
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const onNext = async () => {
    const result = await Audio.compress(recording, { quality: "low" });
    if (result) {
      props?.navigation?.navigate("AddPostDetails", { recording: result });
    }
  };

  const onReset = () => {
    setTimer(0);
    setProgress(0);
    setRecording(false);
    setIsAudioPlaying(false);
    setIsRecording(false);
    setIsRecordingCompleted(false);
    clearInterval(timerRef.current);
    setrecordingLimitReached(false);
    // Trigger background color transition
    Animated.timing(backgroundColor, {
      toValue: 0,
      duration: 500, // transition duration
      useNativeDriver: false,
    }).start();
  };

  const interpolateBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#DB2727"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: interpolateBackgroundColor },
      ]}
    >
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="New Post"
        searchIcon={false}
        rightIcon={
          <StandardButton
            title="Next"
            customStyles={{
              backgroundColor: "#fff",
              width: getPercent(17, width),
              height: getPercent(4, height),
            }}
            textStyles={{
              color: "#DB2727",
              fontFamily: "Medium",
              fontSize: RFValue(12),
            }}
            onPress={() => {
              recording ? onNext() : alert("Require voice recording");
            }}
          />
        }
      />
      <ScrollView>
        <View style={styles.content}>
          <CircleComponent
            gap={1}
            progress={progress}
            containerStyles={{
              backgroundColor: isRecordingCompleted
                ? "rgba(255,255,255,0.2)"
                : "rgba(256,83,74,0)",
            }}
            progressColor={isRecordingCompleted ? "#fff" : "#DB2727"}
          >
            <CircleComponent
              gap={1.12}
              progress={null}
              containerStyles={{
                backgroundColor: isRecordingCompleted
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(256,83,74,0.2)",
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
                  gap={1.3}
                  progress={null}
                  containerStyles={{ backgroundColor: "transparent" }}
                >
                  <Image
                    source={
                      isAudioPlaying
                        ? iconImages[2]
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
            <Text
              style={font(
                20,
                `${isRecordingCompleted ? "#fff" : "#111827"}`,
                "Bold",
                20
              )}
            >
              {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
                timer % 60
              }`}
            </Text>
            <Text
              style={font(
                14,
                `${isRecordingCompleted ? "#fff" : "#9CA3AF"}`,
                "Regular",
                0
              )}
            >
              {isRecordingCompleted
                ? "Confirm your opinion and Post"
                : "Record your max 15-second opinion on this post"}
            </Text>
          </View>
          {!isRecording && recording && (
            <StandardButton
              title="Reset"
              customStyles={{
                width: getPercent(30, width),
                backgroundColor: "#fff",
                alignSelf: "center",
              }}
              textStyles={{
                color: "#222",
              }}
              onPress={onReset}
            />
          )}
          {!isRecordingCompleted && (
            <RecordingButton
              recordingLimitReached={recordingLimitReached}
              setRecording={setRecording}
              recording={recording}
              isRecording={isRecording}
              isRecordingCompleted={isRecordingCompleted}
              start={startRecording}
              stop={stopRecording}
              onConfirm={() => null}
              title={isRecording ? "Stop Recording" : "Start Recording"}
              customStyles={{
                width: getPercent(50, width),
                height: getPercent(7, height),
                marginVertical: getPercent(3, height),
                alignSelf: "center",
              }}
            />
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default NewPost;
