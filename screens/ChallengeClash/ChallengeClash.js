import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ChallengeClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { getPercent } from "../../middleware";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import auth from "@react-native-firebase/auth";
import DualClashCard from "../Search/components/DualClashCard";
import {
  addSubClashToChallenge,
  fetchChallengeClashAndSubClashes,
  updateChallengeClash,
  updateSubClashDetails,
} from "../../state-management/features/challengeClash/challengeClashSlice";
import { selectChallengeClash } from "../../state-management/features/challengeClash";
import ClashCard from "../../globalComponents/UniversalClashCard/ClashCard";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import { font } from "../../styles/Global/main";
import { Instagram } from "react-content-loader/native";

const SubClashes = React.memo(
  ({
    subClashes,
    user_id,
    bottomVoiceSheetRef,
    bottomFlagSheetRef,
    setClashTo,
  }) => {
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    return (
      <View style={styles.clashes_wrapper}>
        {subClashes?.map((clash, index) => (
          <ClashCard
            challengeClash
            user_id={user_id}
            hrLine={index !== subClashes.length - 1}
            postDateAndViews
            data={clash}
            key={clash?.id}
            onPostClashesPress={() => {
              setClashTo(clash);
              bottomVoiceSheetRef.current?.present();
            }}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
          />
        ))}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if subClashes array changes
    return prevProps.subClashes === nextProps.subClashes;
  }
);

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
  const createdAtDate = useMemo(
    () => new Date(challengeClash?.createdAt).toDateString(),
    [challengeClash?.createdAt]
  );

  useEffect(() => {
    if (!error) return;
    console.log(error);
  }, [error]);

  useEffect(() => {
    dispatch(fetchChallengeClashAndSubClashes(clashId));
    let postUserViews = { ...challengeClash?.views } || {};
    if (clashId && challengeClash && !postUserViews[user_id]) {
      postUserViews[user_id] = true;
      dispatch(updateChallengeClash(clashId, { views: postUserViews }));
    }
  }, [dispatch, clashId]);

  const onPostClash = async (clashDetails) => {
    dispatch(addSubClashToChallenge(clashId, clashDetails));
    dispatch(
      updateChallengeClash(clashId, { opinions: eval(subClashes?.length + 1) })
    );

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
      {!prevData ? (
        <Instagram style={{ alignSelf: "center" }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <DualClashCard
              request_type={
                challengeClash?.opponentId == user_id ? "Recieved" : "Sent"
              }
              data={prevData}
              onPress={null}
              showVoting
              postDateAndViews
              subClashes={subClashes} // Use subClashes length from Redux state
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
                {Object.keys(challengeClash?.views || {})?.length || 0}{" "}
                <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
              </Text>
            </View>
            <SubClashes
              subClashes={subClashes}
              user_id={user_id}
              bottomVoiceSheetRef={bottomVoiceSheetRef}
              bottomFlagSheetRef={bottomFlagSheetRef}
              setClashTo={setClashTo}
            />
          </View>
        </ScrollView>
      )}
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
      {/* <BottomMenu /> */}
    </View>
  );
};

export default ChallengeClash;
