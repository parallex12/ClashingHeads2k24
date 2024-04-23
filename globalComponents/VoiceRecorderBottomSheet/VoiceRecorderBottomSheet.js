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
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default VoiceRecorderBottomSheet;
