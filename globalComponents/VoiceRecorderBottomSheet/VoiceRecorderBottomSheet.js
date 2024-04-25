import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
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
import { formatDuration } from "../../utils";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const VoiceRecorderBottomSheet = (props) => {
  let { bottomVoiceSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = VoiceRecorderBottomSheetStyles({ width, height });
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [currentVoiceMode, setCurrentVoiceMode] = useState("mic");
  const [recordingDuration, setRecordingDuration] = useState(0);
  // variables
  const snapPoints = useMemo(() => ["25%", "55%"], []);
  let duration = formatDuration(recordingDuration);

  const onChangeMode = () => {
    setCurrentVoiceMode((prev) => (prev == "mic" ? "emojis" : "mic"));
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
                {currentVoiceMode == "mic" ? (
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
              <Image
                source={require("../../assets/images/MicRec.png")}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={styles.quickAudioWrapper}>
              <Emojis onEmojiPress={(item) => console.log(item)} />
              {recordedVoice ? (
                <WaveAudioPlayer source={recordedVoice?.getURI()} />
              ) : (
                <WaveAudioRecorder
                  setRecordedVoice={setRecordedVoice}
                  setRecordingDuration={setRecordingDuration}
                />
              )}
            </View>
            <StandardButton
              title="Post"
              customStyles={{ width: "50%", marginVertical: 20 }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default VoiceRecorderBottomSheet;
