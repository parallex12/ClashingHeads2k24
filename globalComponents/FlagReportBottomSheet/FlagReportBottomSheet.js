import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import { FlagReportBottomSheetStyles, font } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import StandardButton from "../StandardButton";
import { useMemo, useState } from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { getPercent } from "../../middleware";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";

const FlagReportBottomSheet = (props) => {
  let { bottomSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = FlagReportBottomSheetStyles({ width, height });
  // variables
  const snapPoints = useMemo(() => ["25%", "82%"], []);
  const [selectedFlags, setSelectedFlags] = useState([]);
  const dispatch=useDispatch()

  const CardHeader = () => {
    return (
      <View style={styles.card_header_wrapper}>
        <Text style={font(15, "#181725", "Semibold")}>FLAG REPORT</Text>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.close();
            bottomSheetRef.current = null;
          }}
        >
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const categories = [
    { key: "fake_news", label: "Fake News / Purposeful Misinformation" },
    { key: "hate_speech", label: "Hate Speech" },
    { key: "profanity", label: "Profanity / Personal Insults / Rude" },
    { key: "harassment", label: "Harassment / Threats / Intimidation" },
    {
      key: "illegal_activity",
      label: "Illegal Activity / Violence / Terrorism",
    },
    { key: "libel_slander", label: "Libel / Slander" },
    { key: "fake_profile", label: "Fake Profile / Fake Voice" },
    { key: "lewd_images", label: "Lewd Images" },
    { key: "suspected_troll_bot", label: "Suspected Troll / Bot" },
    { key: "something_else", label: "Something Else" },
  ];

  return (
    <BottomSheetModalProvider>
      <View
        style={[styles.container, { flex: bottomSheetRef.current ? 0 : 1 }]}
      >
        <BottomSheetModal
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={BackDrop}
          enableContentPanningGesture={false}
          onChange={(e) => dispatch(onUpdateBottomSheet(e))}
        >
          <BottomSheetView style={styles.sheetContentContainer}>
            <CardHeader />
            <ScrollView>
              <View style={styles.contentContainer}>
                <Text
                  style={font(14, "#111827", "Semibold", 8, 22, {
                    textAlign: "justify",
                  })}
                >
                  Terms -{" "}
                  <Text style={font(14, "#111827", "Regular")}>
                    Do not troll or flag other Clashers with fake flags or
                    simply because you disagree with them or you may be subject
                    to disciplinary action yourself
                  </Text>
                </Text>
                <Text style={font(14, "#111827", "Semibold", 8, 22)}>
                  Fake news or purposeful misinformation will not be tolerated
                </Text>
                <View style={styles.categoriesWrapper}>
                  {categories?.map((item, index) => {
                    let isSelected =
                      selectedFlags?.filter((e) => e?.key === item?.key)
                        ?.length > 0;
                    return (
                      <TouchableOpacity
                        style={styles.categoriesItemWrapper}
                        key={index}
                        onPress={() =>
                          setSelectedFlags((prev) => {
                            if (isSelected) {
                              return prev.filter((e) => e?.key !== item?.key);
                            } else {
                              return [...prev, item];
                            }
                          })
                        }
                      >
                        {isSelected ? (
                          <Ionicons
                            name="radio-button-on"
                            size={24}
                            color="#DB2727"
                            style={{ marginRight: 10 }}
                          />
                        ) : (
                          <Ionicons
                            name="radio-button-off-outline"
                            size={24}
                            color="#E5E7EB"
                            style={{ marginRight: 10 }}
                          />
                        )}
                        <Text style={font(15, "#111827", "Regular")}>
                          {item?.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <StandardButton
                  title="Submit"
                  customStyles={{
                    width: "100%",
                    height: getPercent(6, height),
                    marginVertical: 20,
                  }}
                  onPress={()=>{
                    bottomSheetRef.current.close()
                    setSelectedFlags([])
                    alert("Report submitted.")
                  }}
                />
              </View>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default FlagReportBottomSheet;
