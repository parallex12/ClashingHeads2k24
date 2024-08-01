import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { UpdatedVoiceRecorderBottomSheetStyles } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isVoiceModalOpen_Recoil } from "../../state-management/atoms/atoms";
import { useRecoilValue } from "recoil";
import BackDrop from "./BackDrop";
import { Image } from "react-native";
import Emojis from "./Emojis";
import WaveAudioPlayer from "../WaveAudioPlayer";
import StandardButton from "../StandardButton";
import WaveAudioRecorder from "../WaveAudioRecorder";
import { formatDuration, stickerArr } from "../../utils";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Stickers from "./Stickers";
import { getPercent } from "../../middleware";
import { selectAuthUser } from "../../state-management/features/auth";
import { generateUniqueId } from "../../state-management/features/singlePost/singlePostSlice";
import { uploadMedia } from "../../middleware/firebase";
import RecordingPlayer from "../RecordingPlayer";
import RoundRecordingComponent from "./RoundRecordingComponent";
import RecordingButton from "../RecordingButton";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { isBottomSheetOpen } from "../../state-management/features/bottom_menu";

const UpdatedVoiceRecorderBottomSheet = (props) => {
  let { bottomVoiceSheetRef, postId, clashTo, onPostClash } = props;
  let { width, height } = useWindowDimensions();
  let styles = UpdatedVoiceRecorderBottomSheetStyles({ width, height });
  const [currentVoiceMode, setCurrentVoiceMode] = useState("mic");
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRecordingCompleted, setIsRecordingCompleted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const timerRef = useRef(null);
  const [recordingLimitReached, setrecordingLimitReached] = useState(false);

  const dispatch = useDispatch();
  // variables
  const snapPoints = useMemo(() => ["25%", "55%"], []);
  let duration = formatDuration(timer);
  let user_profile = useSelector(selectAuthUser);

  const onChangeMode = () => {
    setCurrentVoiceMode((prev) => (prev == "mic" ? "sticker" : "mic"));
  };

  const onPost = async () => {
    setLoading(true);
    let clashDetails = {
      clashType: currentVoiceMode,
      selectedSticker: selectedSticker,
      recording: recording || null,
      postId,
      author: user_profile?._id,
      clashTo: clashTo,
      createdAt: new Date().toISOString(),
    };
    if (
      clashDetails?.recording ||
      (selectedSticker != undefined && currentVoiceMode == "sticker")
    ) {
      onPostClash(clashDetails);
      bottomVoiceSheetRef.current.close();
      onReset();
      setLoading(false);
    } else {
      alert("Record voice.");
    }
  };

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
    } catch (error) {
      console.log("Error stopping recording:", error);
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
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          name="recordModal"
          ref={bottomVoiceSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
          onDismiss={() => onReset()}
          onChange={(e) => dispatch(onUpdateBottomSheet(e))}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.micWrapper}>
              <TouchableOpacity
                style={styles.changeModeBtn}
                onPress={onChangeMode}
              >
                {currentVoiceMode == "sticker" ? (
                  <FontAwesome name="microphone" size={24} color="#fff" />
                ) : (
                  <MaterialIcons name="emoji-emotions" size={24} color="#fff" />
                )}
              </TouchableOpacity>
              {currentVoiceMode == "sticker" ? (
                <Image
                  source={stickerArr[selectedSticker || 0].img}
                  resizeMode="cover"
                  style={{ width: "100%", height: getPercent(20, height) }}
                />
              ) : (
                <RoundRecordingComponent
                  progress={progress}
                  setProgress={setProgress}
                  isRecordingCompleted={isRecordingCompleted}
                  setIsRecordingCompleted={setIsRecordingCompleted}
                  isAudioPlaying={isAudioPlaying}
                  setIsAudioPlaying={setIsAudioPlaying}
                  timer={timer}
                  setTimer={setTimer}
                  recording={recording}
                  setRecording={setRecording}
                />
              )}
            </View>
            <View style={styles.quickAudioWrapper}>
              {currentVoiceMode == "mic" ? (
                <>
                  <Emojis onEmojiPress={(item) => console.log(item)} />
                </>
              ) : (
                <View style={{ paddingVertical: getPercent(1, height) }}>
                  <Stickers
                    selectedSticker={selectedSticker}
                    setSelectedSticker={setSelectedSticker}
                  />
                </View>
              )}
            </View>

            {currentVoiceMode != "mic" && (
              <StandardButton
                title="Post"
                loading={loading}
                customStyles={{ width: "45%", marginVertical: 20 }}
                onPress={onPost}
              />
            )}
            {!isRecording && recording && (
              <View style={styles.postBtnsWrapper}>
                <StandardButton
                  title="Post"
                  loading={loading}
                  customStyles={{ width: "45%", marginVertical: 20 }}
                  onPress={onPost}
                />
                <StandardButton
                  title="Reset"
                  customStyles={{
                    width: "45%",
                    backgroundColor: "#E5E7EB",
                    alignSelf: "center",
                  }}
                  textStyles={{
                    color: "#222",
                  }}
                  onPress={onReset}
                />
              </View>
            )}
            {!isRecordingCompleted && currentVoiceMode == "mic" && (
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
                customStyles={[
                  styles.actionBtn,
                  { borderColor: isRecording ? "#E5E7EB" : "#4B4EFC" },
                ]}
                textStyles={[
                  styles.actionBtnText,
                  { color: isRecording ? "#222" : "#4B4EFC" },
                ]}
              />
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default UpdatedVoiceRecorderBottomSheet;
