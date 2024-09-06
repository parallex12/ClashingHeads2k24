import { View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import ClashApi from "../../ApisManager/ClashApi";
import usePostClashes from "../../Hooks/usePostClashes";
import ClashFlatlist from "../../globalComponents/ClashFlatlist/ClashFlatlist";
import { useFeedPost } from "../../Hooks/useUserFeed";
import { Instagram } from "react-content-loader/native";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashTo, setClashTo] = useState("post");
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const { createClash } = new ClashApi();
  let prevPostData = props?.route?.params;
  let postId = prevPostData?._id;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  const postClashes = usePostClashes(postId);
  const feedPost = useFeedPost(postId, prevPostData);

  useEffect(() => {
    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, []);

  const onPostClash = async (clashDetails) => {
    await createClash(clashDetails);
    postClashes.refetch();
  };

  const onReportPress = () => {
    bottomFlagSheetRef?.current?.present();
  };

  const onPostClashesPress = (clash) => {
    setClashTo(clash);
    bottomVoiceSheetRef.current?.present();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Post"
        searchIcon={false}
      />
        <ClashFlatlist
          ListHeaderComponent={
            !feedPost?.isLoading ? (
              <PostCard
                postDateAndViews
                data={feedPost?.data?.post} // Render post data from Redux state
                onPostClashesPress={() =>
                  bottomVoiceSheetRef.current?.present()
                }
                onReportPress={onReportPress}
                views={feedPost?.data?.post?.views?.length}
                onProfilePress={() =>
                  props?.navigation?.navigate("UserProfile")
                }
              />
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
        <FlagReportBottomSheet
          postId={postId}
          bottomSheetRef={bottomFlagSheetRef}
        />
    </View>
  );
};

export default ClashDetails;
