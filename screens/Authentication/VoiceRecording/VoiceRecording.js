import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/VoiceRecording/main";
import { font } from "../../../styles/Global/main";
import { getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import CircleComponent from "./components/CircleComponent";
import RecordingButton from "../../../globalComponents/RecordingButton";
import RecordingPlayer from "../../../globalComponents/RecordingPlayer";
import { uploadMedia } from "../../../middleware/firebase";
import { selectAuthUser } from "../../../state-management/features/auth";
import StandardButton from "../../../globalComponents/StandardButton";
import { Audio } from "react-native-compressor";
import { setUserDetails } from "../../../state-management/features/auth/authSlice";
import UserApi from "../../../ApisManager/UserApi";

const VoiceRecording = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [loading, setLoading] = useState(false);
  let iconImages = [
    require("../../../assets/icons/recorderVector.png"),
    require("../../../assets/icons/bgPlay.png"),
    require("../../../assets/icons/bgPause.png"),
  ];
  const [recording, setRecording] = useState(false);
  const [sound, setSound] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recordingLimitReached, setrecordingLimitReached] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const timerRef = useRef(null);
  const user = useSelector(selectAuthUser);
  let recordingLimit = 15;
  const dispatch = useDispatch();
  const userapi = new UserApi();

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setTimer(0);
      setProgress(0);
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= recordingLimit) {
            setrecordingLimitReached(true);
            return prevTimer;
          }
          return prevTimer + 1;
        });
        setProgress((prevProgress) => {
          if (prevProgress >= 100) return 100;
          return prevProgress + 100 / recordingLimit;
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
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const onReset = () => {
    setRecording(false);
    setIsAudioPlaying(false);
    setIsRecording(false);
    setTimer(0);
    setProgress(0);
    setIsRecordingCompleted(false);
    clearInterval(timerRef.current);
    setrecordingLimitReached(false);
  };

  const onConfirm = async () => {
    try {
      if (recording) {
        setLoading(true);
        clearInterval(timerRef.current);
        const result = await Audio.compress(recording, { quality: "low" });
        await uploadMedia(result, "profileRecordings")
          .then(async (res) => {
            if (res.url) {
              let data = { hasVoiceAdded: true, about_voice: res?.url };
              const result = await userapi.updateUserProfile(user?._id, data);
              let user = result?.user;
              if (user) {
                dispatch(setUserDetails(user));
                if (!user?.hasProfilePhoto) {
                  props?.navigation?.navigate("ProfilePhoto");
                  return;
                }
                props?.navigation?.navigate("Home");
              }
              setLoading(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error stopping recording:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <BackButton color="#ffffff" />
          <View style={styles.formWrapper}>
            <Text style={font(25, "#ffffff", "Semibold", 3)}>
              Tell us about yourself
            </Text>
            <Text style={font(16, "#ffffff", "Regular", 7)}>
              Record in your real voice about yourself
            </Text>
            <View style={styles.recorderWrapper}>
              <CircleComponent
                gap={1}
                progress={progress == "NaN" ? 0 : progress}
              >
                <CircleComponent gap={1.12} progress={null}>
                  <RecordingPlayer
                    setSound={setSound}
                    sound={sound}
                    setProgress={setProgress}
                    isAudioPlaying={isAudioPlaying}
                    source={recording}
                    setIsAudioPlaying={setIsAudioPlaying}
                    setTimer={setTimer}
                  >
                    <CircleComponent gap={1.3} progress={null}>
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
                <Text style={font(25, "#ffffff", "Bold", 20)}>
                  {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${
                    timer % 60
                  }`}
                </Text>
                <Text style={font(17, "#ffffff", "Regular", 0)}>
                  {recording
                    ? "Confirm your opinion and Post"
                    : "Record your max 15-second opinion on this post"}
                </Text>
              </View>
            </View>
          </View>
          {!isRecording && recording && (
            <StandardButton
              title="Reset"
              customStyles={{
                width: getPercent(50, width),
                height: getPercent(6, height),
                backgroundColor: isRecording
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,1)",
                alignSelf: "center",
              }}
              textStyles={{
                color: "#222",
              }}
              onPress={onReset}
            />
          )}
          <RecordingButton
            theme="light"
            loading={loading}
            recordingLimitReached={recordingLimitReached}
            setRecording={setRecording}
            recording={recording}
            isRecording={isRecording}
            isRecordingCompleted={isRecordingCompleted}
            start={startRecording}
            stop={stopRecording}
            onConfirm={onConfirm}
            title={
              isRecording
                ? "Stop Recording"
                : isRecordingCompleted
                ? "Confirm"
                : "Start Recording"
            }
            customStyles={{
              width: getPercent(50, width),
              height: getPercent(6, height),
              marginVertical: getPercent(3, height),
              backgroundColor: isRecording
                ? "rgba(255,255,255,0.3)"
                : "rgba(255,255,255,1)",
              alignSelf: "center",
            }}
            textStyles={{
              color: isRecording
                ? "#fff"
                : isRecordingCompleted
                ? "#DB2727"
                : "#4B4EFC",
              fontFamily: "Semibold",
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VoiceRecording;
