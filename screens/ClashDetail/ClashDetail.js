import { View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import { useEffect, useRef, useState } from "react";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import ClashApi from "../../ApisManager/ClashApi";
import usePostClashes from "../../Hooks/usePostClashes";
import ClashFlatlist from "../../globalComponents/ClashFlatlist/ClashFlatlist";
import { useFeedPost } from "../../Hooks/useUserFeed";
import { Instagram } from "react-content-loader/native";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";
import { PostActionsSheetProvider } from "../../globalComponents/BottomSheet/PostActionsSheetProvider";
import PostApi from "../../ApisManager/PostApi";
import useUserProfile from "../../Hooks/useUserProfile";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashTo, setClashTo] = useState("post");
  const bottomVoiceSheetRef = useRef(null);
  const { createClash } = new ClashApi();
  let prevPostData = props?.route?.params;
  let postId = prevPostData?._id;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  const postClashes = usePostClashes(postId);
  const feedPost = useFeedPost(postId, prevPostData);
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const { updatePostById } = new PostApi();
  let user_interaction = prevPostData?.views?.includes(currentUser?._id);

  useEffect(() => {
    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
    if (!user_interaction) {
      (async () => {
        let updated_views = [...prevPostData?.views, currentUser?._id];
        await updatePostById(prevPostData?._id, { views: updated_views });
      })();
    }
  }, []);

  const onPostClash = async (clashDetails) => {
    try {
      await createClash(clashDetails);
      const updatedClashes = (prevPostData?.clashes || 0) + 1;
      await updatePostById(prevPostData?._id, { clashes: updatedClashes });
      postClashes.refetch();
    } catch (e) {
      console.log("ClashDetails->onPostClash", e);
    }
  };

  const onPostClashesPress = (clash) => {
    setClashTo(clash);
    bottomVoiceSheetRef.current?.present();
  };

  return (
    <FlagReportSheetProvider>
      <PostActionsSheetProvider>
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
            itemActions={{ onPostClashesPress }}
          />

          <UpdatedVoiceRecorderBottomSheet
            clashTo={clashTo}
            postId={postId}
            bottomVoiceSheetRef={bottomVoiceSheetRef}
            onPostClash={onPostClash}
            stickers
          />
        </View>
      </PostActionsSheetProvider>
    </FlagReportSheetProvider>
  );
};

export default ClashDetails;
