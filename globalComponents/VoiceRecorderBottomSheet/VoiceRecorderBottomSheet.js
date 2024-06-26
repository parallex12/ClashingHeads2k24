import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { VoiceRecorderBottomSheetStyles } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
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
import {
  addClash,
  addClashToPost,
  generateUniqueId,
  updateClashDetails,
} from "../../state-management/features/singlePost/singlePostSlice";
import { uploadMedia } from "../../middleware/firebase";

const VoiceRecorderBottomSheet = (props) => {
  let { bottomVoiceSheetRef, postId, clashTo } = props;
  let { width, height } = useWindowDimensions();
  let styles = VoiceRecorderBottomSheetStyles({ width, height });
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [currentVoiceMode, setCurrentVoiceMode] = useState("mic");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [isReadyToClash, setIsReadyToClash] = useState(false);
  const dispatch = useDispatch();
  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  let duration = formatDuration(recordingDuration);
  let user_profile = useSelector(selectAuthUser);
  const onChangeMode = () => {
    setCurrentVoiceMode((prev) => (prev == "mic" ? "sticker" : "mic"));
  };

  const onPostClash = async () => {
    let clashDetails = {
      id: generateUniqueId(),
      clashType: currentVoiceMode,
      selectedSticker: selectedSticker,
      recording: recordedVoice?.getURI() || null,
      postId,
      likes: 0,
      reactions: {},
      dislikes: 0,
      clashes: 0,
      listened:0,
      author: { ...user_profile },
      clashTo: clashTo,
      createdAt: new Date().toISOString(),
    };
    if (selectedSticker != undefined || recordedVoice) {
      dispatch(addClashToPost(postId, clashDetails));
      if (clashTo != "post") {
        dispatch(
          updateClashDetails(postId, clashTo?.id, {
            clashes: eval(clashTo?.clashes + 1),
          })
        );
      }
      setRecordedVoice(null);
      setRecordingDuration(0);
      bottomVoiceSheetRef.current.close();
      return;
    }
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomVoiceSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.timerWrapper}>
              <Text style={styles.timerText}>{duration || "00:00"}</Text>
              <TouchableOpacity
                style={styles.changeModeBtn}
                onPress={onChangeMode}
              >
                {currentVoiceMode == "sticker" ? (
                  <FontAwesome name="microphone" size={24} color="#DB2727" />
                ) : (
                  <MaterialIcons
                    name="emoji-emotions"
                    size={24}
                    color="#DB2727"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.micWrapper}>
              {currentVoiceMode == "sticker" ? (
                <Image
                  source={stickerArr[selectedSticker || 0].img}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/MicRec.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
            <View style={styles.quickAudioWrapper}>
              {currentVoiceMode == "mic" ? (
                <>
                  <Emojis onEmojiPress={(item) => console.log(item)} />
                </>
              ) : (
                <View style={{ paddingVertical: getPercent(2, height) }}>
                  <Stickers
                    selectedSticker={selectedSticker}
                    setSelectedSticker={setSelectedSticker}
                  />
                </View>
              )}

              {currentVoiceMode == "mic" ? (
                recordedVoice ? (
                  <WaveAudioPlayer
                    audioResetBtn
                    source={recordedVoice?.getURI()}
                  />
                ) : (
                  <WaveAudioRecorder
                    setRecordedVoice={setRecordedVoice}
                    setRecordingDuration={setRecordingDuration}
                  />
                )
              ) : null}
            </View>
            <StandardButton
              title="Post"
              customStyles={{ width: "50%", marginVertical: 20 }}
              onPress={onPostClash}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default VoiceRecorderBottomSheet;
