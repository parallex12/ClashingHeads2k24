import { ActivityIndicator, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import DualClashCard from "../Search/components/DualClashCard";
import { addSubClashToChallenge, fetchChallengeClashAndSubClashes, updateChallengeClash, updateSubClashDetails } from "../../state-management/features/challengeClash/challengeClashSlice";
import { selectChallengeClash } from "../../state-management/features/challengeClash";
import { startLoading, stopLoading } from "../../state-management/features/screen_loader/loaderSlice";
import ClashCard from "../../globalComponents/UniversalClashCard/ClashCard";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import { font } from "../../styles/Global/main";

const ChallengeClash = (props) => {
  let { } = props;
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
  const createdAtDate = new Date(challengeClash?.createdAt).toDateString();

  useEffect(() => {
    dispatch(fetchChallengeClashAndSubClashes(clashId));
    // let postUserViews = { ...challengeClash?.views } || {};
    // if (clashId && challengeClash?.author && !postUserViews[user_id]) {
    //   postUserViews[user_id] = true;
    //   dispatch(updateChallengeClash(clashId, { views: postUserViews }));
    // }
  }, [dispatch, clashId]);



  const onPostClash = async (clashDetails) => {
    dispatch(addSubClashToChallenge(clashId, clashDetails));
    if (clashTo != "post") {
      dispatch(
        updateSubClashDetails(clashId, clashTo?.id, {
          clashes: eval(clashTo?.clashes + 1),
        })
      );
    }
  };


  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Clash"
        searchIcon={false}
      />
      {
        !challengeClash ?
          <ActivityIndicator />
          :
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              <DualClashCard
                data={challengeClash}
                onPress={null}
                showVoting
                postDateAndViews
                totalClashes={subClashes?.length} // Use subClashes length from Redux state
                onClashesPress={() => bottomVoiceSheetRef.current?.present()}
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
                views={Object.keys(challengeClash?.views || {})?.length}
                onProfilePress={() => props?.navigation?.navigate("UserProfile")}
              />
              <View style={styles.postDateAndViews}>
                <Text style={font(10, "#9CA3AF", "Regular")}>
                  Posted on {createdAtDate}
                </Text>
                <Text style={font(10, "#111827", "Bold")}>
                  {challengeClash?.views || 0}{" "}
                  <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
                </Text>
              </View>

              <View style={styles.clashes_wrapper}>
                {subClashes?.map((clash, index) => {
                  return <ClashCard
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
                })}
              </View>
            </View>
          </ScrollView>
      }
      <VoiceRecorderBottomSheet
        clashTo={clashTo}
        postId={clashId}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
        onPostClash={onPostClash}
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
