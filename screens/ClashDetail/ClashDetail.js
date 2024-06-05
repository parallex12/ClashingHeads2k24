import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import ClashCard from "./components/ClashCard";
import { useRef, useState } from "react";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import { useRecoilState } from "recoil";
import { isVoiceModalOpen_Recoil } from "../../state-management/atoms/atoms";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let prevData = props?.route?.params;
  const [postClashes, setPostClashes] = useState([]);
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Post"
        searchIcon={false}
      />
      <ScrollView>
        <View style={styles.content}>
          <PostCard
            postDateAndViews
            data={prevData}
            postClashes={postClashes?.length}
            onPostClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
          />
          <View style={styles.clashes_wrapper}>
            {postClashes.map((item, index) => {
              let showHrLine = index + 1 == postClashes?.length;
              return (
                <ClashCard
                  hrLine={!showHrLine}
                  postDateAndViews
                  data={prevData}
                  key={index}
                  onReportPress={() => bottomFlagSheetRef?.current?.present()}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <VoiceRecorderBottomSheet bottomVoiceSheetRef={bottomVoiceSheetRef} />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <BottomMenu />
    </View>
  );
};

export default ClashDetails;
