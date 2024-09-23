import React, { useEffect, useRef, useState, useMemo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { font } from "../../styles/Global/main";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import ClashApi from "../../ApisManager/ClashApi";
import usePostClashes from "../../Hooks/usePostClashes";
import ClashFlatlist from "../../globalComponents/ClashFlatlist/ClashFlatlist";
import { useFeedPost } from "../../Hooks/useUserFeed";
import { Instagram } from "react-content-loader/native";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";

const ChallengeClash = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let prevPostData = props?.route?.params;
  let postId = prevPostData?._id;
  const { createClash } = new ClashApi();
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const [clashTo, setClashTo] = useState("post");
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  const feedPost = useFeedPost(postId, prevPostData);
  const postClashes = usePostClashes(postId);

  const createdAtDate = useMemo(
    () => new Date(prevPostData?.createdAt).toDateString(),
    [prevPostData?.createdAt]
  );

  useEffect(() => {
    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, []);

  const onPostClash = async (clashDetails) => {
    await createClash(clashDetails);
    postClashes?.refetch();
  };

  const onReportPress = () => {
    bottomFlagSheetRef?.current?.present();
  };

  const onPostClashesPress = (clash) => {
    setClashTo(clash);
    bottomVoiceSheetRef.current?.present();
  };

  return (
    <FlagReportSheetProvider>
      <View style={styles.container}>
        <StandardHeader
          containerStyles={{ height: getPercent(15, height) }}
          backButton
          title="Clash"
          searchIcon={false}
        />
        <ClashFlatlist
          ListHeaderComponent={
            !feedPost?.isLoading ? (
              <>
                <ChallengeCard
                  showVoting
                  data={feedPost?.data?.post}
                  onClashesPress={onPostClashesPress}
                  onReportPress={onReportPress}
                />
                <View style={styles.postDateAndViews}>
                  <Text style={font(12, "#9CA3AF", "Regular")}>
                    Posted on {createdAtDate}
                  </Text>
                  <Text style={font(12, "#111827", "Bold")}>
                    {feedPost?.data?.post?.views?.length || 0}{" "}
                    <Text style={font(12, "#9CA3AF", "Regular")}>Views</Text>
                  </Text>
                </View>
              </>
            ) : (
              <Instagram />
            )
          }
          query={postClashes}
          itemActions={{ onPostClashesPress, onReportPress }}
        />

        <UpdatedVoiceRecorderBottomSheet
          clashTo={clashTo}
          postId={postId}
          bottomVoiceSheetRef={bottomVoiceSheetRef}
          onPostClash={onPostClash}
          stickers
        />
      </View>
    </FlagReportSheetProvider>
  );
};

export default ChallengeClash;
