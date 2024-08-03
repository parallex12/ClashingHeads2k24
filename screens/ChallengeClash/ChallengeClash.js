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
import {
  get_post_by_id,
  update_post_by_id,
} from "../../state-management/apiCalls/post";
import { selectAuthUser } from "../../state-management/features/auth";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import { create_clash } from "../../state-management/apiCalls/clash";

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
  const [clashTo, setClashTo] = useState("post");
  const [postData, setPostData] = useState("post");
  const currentUser = useSelector(selectAuthUser);
  let { _id } = currentUser;
  let postId = prevData?._id;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;

  const createdAtDate = useMemo(
    () => new Date(prevData?.createdAt).toDateString(),
    [prevData?.createdAt]
  );

  useEffect(() => {
    get_post_by_id(postId)
      .then((res) => {
        let views = [...res?.views];
        if (!views?.includes(_id)) {
          views.push(_id);
          update_post_by_id(postId, { views });
        }
        setPostData(res);
      })
      .catch((e) => console.log(e));

    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, [dispatch, postId]);

  const onPostClash = async (clashDetails) => {
    await create_clash(clashDetails);
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
              showVoting
              divider
              data={postData || prevData}
              onClashesPress={() => bottomVoiceSheetRef.current.present()}
            />
            <View style={styles.postDateAndViews}>
              <Text style={font(10, "#9CA3AF", "Regular")}>
                Posted on {createdAtDate}
              </Text>
              <Text style={font(10, "#111827", "Bold")}>
                {prevData?.views?.length || 0}{" "}
                <Text style={font(10, "#9CA3AF", "Regular")}>Views</Text>
              </Text>
            </View>
            <SubClashes
              subClashes={postData?.clashes}
              user_id={_id}
              bottomVoiceSheetRef={bottomVoiceSheetRef}
              bottomFlagSheetRef={bottomFlagSheetRef}
              setClashTo={setClashTo}
            />
          </View>
        </ScrollView>
      )}
      <UpdatedVoiceRecorderBottomSheet
        clashTo={clashTo}
        postId={postId}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
        onPostClash={onPostClash}
        stickers
      />
      <FlagReportBottomSheet
        postId={postId}
        bottomSheetRef={bottomFlagSheetRef}
      />
      {/* <BottomMenu /> */}
    </View>
  );
};

export default ChallengeClash;
