import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/VoiceRecording/main";
import { font } from "../../../styles/Global/main";
import { getPercent, registrationFields } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import CircleComponent from "./components/CircleComponent";
import RecordingButton from "../../../globalComponents/RecordingButton";
import RecordingPlayer from "../../../globalComponents/RecordingPlayer";
import { update_user_details, uploadMedia } from "../../../middleware/firebase";
import auth from "@react-native-firebase/auth";
import { startLoading, stopLoading } from "../../../state-management/features/screen_loader/loaderSlice";
import { selectAuthUser, selectUserForm } from "../../../state-management/features/auth";

const VoiceRecording = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const userform = useSelector(selectUserForm);
  const [form, setForm] = useState(userform)
  const [errorField, setErrorField] = useState({});
  const user = auth().currentUser
  const dispatch = useDispatch()

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
  const [progress, setProgress] = useState(0);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const timerRef = useRef(null);
  const user_profile_details=useSelector(selectAuthUser)

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setTimer(0);
      setProgress(0);
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer >= 15) {
            stopRecording();
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
    } catch (error) {
      console.log("Error stopping recording:", error);
    }
  };

  const onConfirm = async () => {
    try {
      if (recording) {
        dispatch(startLoading())
        clearInterval(timerRef.current);
        await uploadMedia(recording, "profileRecordings")
          .then((res) => {
            if (res.url) {
              let data = { hasVoiceAdded: true, about_voice: res?.url };
              update_user_details(user?.uid, data).then((res) => {
                if (!user_profile_details?.hasProfilePhoto) {
                  props?.navigation?.navigate("ProfilePhoto");
                  dispatch(stopLoading())
                }
                if(res?.code==200){
                  props?.navigation?.navigate("Home");
                }
              });
            }
          })
          .catch((e) => {
            console.log(e);
            dispatch(stopLoading())
          });
      }
    } catch (error) {
      dispatch(stopLoading())
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
            <Text style={font(20, "#ffffff", "Semibold", 3)}>
              Tell us about yourself
            </Text>
            <Text style={font(12, "#ffffff", "Regular", 7)}>
              Record in your real voice about yourself
            </Text>
            <View style={styles.recorderWrapper}>
              <CircleComponent gap={1} progress={progress}>
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
                <Text style={font(20, "#ffffff", "Bold", 20)}>
                  {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60
                    }`}
                </Text>
                <Text style={font(14, "#ffffff", "Regular", 0)}>
                  {recording
                    ? "Confirm your opinion and Post"
                    : "Record your max 15-second opinion on this post"}
                </Text>
              </View>
            </View>
          </View>
          <RecordingButton
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
              height: getPercent(7, height),
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
