import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import ClashCard from "./components/ClashCard";
import { useEffect, useRef, useState } from "react";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import { useRecoilState } from "recoil";
import { isVoiceModalOpen_Recoil } from "../../state-management/atoms/atoms";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { makeSelectSinglePost } from "../../state-management/features/singlePost";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePostAndClashes } from "../../state-management/features/singlePost/singlePostSlice";

const ClashDetails = (props) => {
  let { } = props;
  const dispatch = useDispatch();
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let prevData = props?.route?.params;
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  let postId = prevData?.id
  const [clashTo, setClashTo] = useState("post")
  const selectSinglePost = makeSelectSinglePost(postId);
  const { post, subClashes, loading, error } = useSelector(selectSinglePost);

  useEffect(() => {
    // Dispatch the fetchSinglePostAndClashes thunk action with the postId
    dispatch(fetchSinglePostAndClashes(postId));
  }, [dispatch, postId]);



  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Post"
        searchIcon={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <PostCard
            postDateAndViews
            data={post} // Render post data from Redux state
            postClashes={subClashes?.length} // Use subClashes length from Redux state
            onPostClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
          />
          <View style={styles.clashes_wrapper}>
            {subClashes?.map((clash, index) => (
              <ClashCard
                hrLine={index !== subClashes.length - 1} // Show hrLine for all but the last clash
                postDateAndViews
                data={clash} // Render individual clash data
                key={clash?.id} // Use a unique key for each ClashCard
                onPostClashesPress={() => {
                  setClashTo(clash?.id)
                  bottomVoiceSheetRef.current?.present()
                }}
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <VoiceRecorderBottomSheet clashTo={clashTo} postId={postId} bottomVoiceSheetRef={bottomVoiceSheetRef} />
      <FlagReportBottomSheet postId={postId} bottomSheetRef={bottomFlagSheetRef} />
      <BottomMenu />
    </View>
  );
};

export default ClashDetails;
