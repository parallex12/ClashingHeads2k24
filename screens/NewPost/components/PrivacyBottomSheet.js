import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { getPercent, postprivacyoptions } from "../../../middleware";
import { PrivacyBottomSheetStyles as _styles } from "../../../styles/NewPost/main";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackDrop from "../../../globalComponents/FlagReportBottomSheet/BackDrop";
import { Fontisto } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { Text } from "react-native";
import StandardButton from "../../../globalComponents/StandardButton";

const PrivacyBottomSheet = (props) => {
  let { bottomSheetRef, setPostForm, postForm } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const snapPoints = useMemo(() => ["25%", "40%"], []);

  useEffect(() => {
    if (postForm?.privacy == null) {
      setPostForm((prev) => {
        return { ...prev, privacy: 0 };
      });
    }
  }, [postForm?.privacy]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackDrop}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.content}>
          <Text style={font(18, "#111827", "Regular")}>Choose Audience</Text>
          <View style={{ marginVertical: getPercent(2, height), flex: 0.8 }}>
            {postprivacyoptions?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.rowItem}
                  onPress={() => {
                    setPostForm((prev) => {
                      return { ...prev, privacy: item?.key };
                    });
                  }}
                >
                  {item?.icon}
                  <Text
                    style={font(15, "#6B7280", "Light", 0, null, {
                      marginLeft: 10,
                      flex: 1,
                    })}
                  >
                    {item?.label}
                  </Text>
                  <Fontisto
                    name={
                      postForm?.privacy == item?.key
                        ? "radio-btn-active"
                        : "radio-btn-passive"
                    }
                    size={16}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <StandardButton
            title="Done"
            customStyles={{
              width: "50%",
              alignSelf: "center",
              paddingVertical:10
            }}
            onPress={() => bottomSheetRef.current.close()}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default PrivacyBottomSheet;
