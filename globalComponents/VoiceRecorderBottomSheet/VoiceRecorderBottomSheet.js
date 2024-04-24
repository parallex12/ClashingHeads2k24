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

const VoiceRecorderBottomSheet = (props) => {
  let { bottomVoiceSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = VoiceRecorderBottomSheetStyles({ width, height });

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

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
              <Text style={styles.timerText}>00:15</Text>
              <TouchableOpacity style={styles.shareBtn}></TouchableOpacity>
            </View>
            <View style={styles.micWrapper}>
              <Image
                source={require("../../assets/images/MicRec.png")}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={styles.quickAudioWrapper}>

            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default VoiceRecorderBottomSheet;
