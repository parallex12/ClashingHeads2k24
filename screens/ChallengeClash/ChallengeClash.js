import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import ClashCard from "./components/ClashCard";
import { useEffect, useRef, useState } from "react";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import DualClashCard from "../Search/components/DualClashCard";
import { fetchChallengeClashAndSubClashes } from "../../state-management/features/challengeClash/challengeClashSlice";
import { selectChallengeClash } from "../../state-management/features/challengeClash";

const ChallengeClash = (props) => {
  let {} = props;
  const dispatch = useDispatch();
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let prevData = props?.route?.params;
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  let clashId = prevData?.id;
  const [clashTo, setClashTo] = useState("post");
  const { challengeClash, subClashes, loading, error } =
    useSelector(selectChallengeClash);
  const user_id = auth().currentUser?.uid;

  useEffect(() => {
    dispatch(fetchChallengeClashAndSubClashes(clashId));
    let postUserViews = { ...challengeClash?.views } || {};
    if (clashId && challengeClash?.author && !postUserViews[user_id]) {
      postUserViews[user_id] = true;
      dispatch(updatePost(clashId, { views: postUserViews }));
    }
  }, [dispatch, clashId]);


  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Clash"
        searchIcon={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <DualClashCard
            data={challengeClash}
            onPress={() =>
              props?.navigation?.navigate("ChallengeClash", { ...item })
            }
            totalClashes={subClashes?.length} // Use subClashes length from Redux state
            onClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
            views={Object.keys(challengeClash?.views || {})?.length}
            onProfilePress={() => props?.navigation?.navigate("UserProfile")}
          />
          {/* <PostCard
            postDateAndViews
            data={post} // Render post data from Redux state
            postClashes={subClashes?.length} // Use subClashes length from Redux state
            onPostClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
            views={Object.keys(post?.views || {})?.length}
            onProfilePress={() => props?.navigation?.navigate("UserProfile")}
          /> */}
          <View style={styles.clashes_wrapper}>
            {subClashes?.map((clash, index) => (
              <ClashCard
                user_id={user_id}
                hrLine={index !== subClashes.length - 1} // Show hrLine for all but the last clash
                postDateAndViews
                data={clash} // Render individual clash data
                key={clash?.id} // Use a unique key for each ClashCard
                onPostClashesPress={() => {
                  setClashTo(clash);
                  bottomVoiceSheetRef.current?.present();
                }}
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <VoiceRecorderBottomSheet
        clashTo={clashTo}
        postId={clashId}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
        challengeClash
      />
      <FlagReportBottomSheet
        postId={clashId}
        bottomSheetRef={bottomFlagSheetRef}
      />
      <BottomMenu />
    </View>
  );
};

export default ChallengeClash;
