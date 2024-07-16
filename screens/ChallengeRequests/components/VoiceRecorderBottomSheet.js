import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { VoiceRecorderBottomSheetStyles } from "../../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BackDrop from "./BackDrop";
import { Image } from "react-native";
import Emojis from "./Emojis";
import { formatDuration, stickerArr } from "../../../utils";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { getPercent } from "../../../middleware";
import { selectAuthUser } from "../../../state-management/features/auth";
import WaveAudioRecorder from "../../../globalComponents/WaveAudioRecorder";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import Stickers from "./Stickers";
import StandardButton from "../../../globalComponents/StandardButton";
import { uploadMedia } from "../../../middleware/firebase";
import { updateChallengeRequestForUser } from "../../../state-management/features/challengeRequests/challengeRequestsSlice";
import { useNavigation } from "@react-navigation/native";

const VoiceRecorderBottomSheet = (props) => {
  let { bottomVoiceSheetRef, challengeId } = props;
  let { width, height } = useWindowDimensions();
  let styles = VoiceRecorderBottomSheetStyles({ width, height });
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [currentVoiceMode, setCurrentVoiceMode] = useState("mic");
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // variables
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  let duration = formatDuration(recordingDuration);
  let user_profile = useSelector(selectAuthUser);
  const navigation = useNavigation();
  const onChangeMode = () => {
    setCurrentVoiceMode((prev) => (prev == "mic" ? "sticker" : "mic"));
  };

  const onPost = async () => {
    setLoading(true);
    if (recordedVoice) {
      await uploadMedia(recordedVoice?.getURI(), "challengeClashesAudios")
        .then(async (res) => {
          if (res?.url) {
            dispatch(
              updateChallengeRequestForUser(challengeId, {
                status: "accepted",
                opponent_audio: res?.url,
              })
            );
          }
          setRecordedVoice(null);
          setRecordingDuration(0);
          bottomVoiceSheetRef.current.close();
          navigation.navigate("Clashes");
          alert("Congrats! Challenge has been started.");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      alert("Recording is required");
      setLoading(false);
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
                  source={require("../../../assets/images/MicRec.png")}
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
              loading={loading}
              title="Post & Accept Challenge"
              customStyles={{ width: "60%", marginVertical: 20 }}
              onPress={onPost}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default VoiceRecorderBottomSheet;
