import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useDispatch, useSelector } from "react-redux";
import ClashCard from "../../globalComponents/UniversalClashCard/ClashCard";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import { selectAuthUser } from "../../state-management/features/auth";
import PostApi from "../../ApisManager/PostApi";
import ClashApi from "../../ApisManager/ClashApi";

const ClashDetails = (props) => {
  let {} = props;
  const dispatch = useDispatch();
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashTo, setClashTo] = useState("post");
  const [postData, setPostData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const { _id } = useSelector(selectAuthUser);
  const postApi = new PostApi();
  const clashApi = new ClashApi();
  let prevPostData = props?.route?.params;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  let postId = prevPostData?._id;

  useEffect(() => {
    get_post();
    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, [dispatch, postId, refreshing]);

  const get_post = async () => {
    try {
      let result = await postApi.getPostById(postId);
      let clashesResult = await clashApi.getClashesByPostId(postId);
      let views = [...result?.post?.views];
      setRefreshing(false);
      if (!views?.includes(_id)) {
        views?.push(_id);
        result = await postApi.updatePostById(postId, { views });
      }
      setPostData({ ...result?.post, clashes: clashesResult?.clashes });
    } catch (e) {
      console.log(e);
      setRefreshing(false);
    }
  };

  const onPostClash = async (clashDetails) => {
    await clashApi.createClash(clashDetails);
    get_post();
  };

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Post"
        searchIcon={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <PostCard
            postDateAndViews
            data={postData || prevPostData} // Render post data from Redux state
            onPostClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
            views={postData?.views?.length}
            onProfilePress={() => props?.navigation?.navigate("UserProfile")}
          />
          <View style={styles.clashes_wrapper}>
            {postData?.clashes?.map((clash, index) => (
              <ClashCard
                user_id={_id}
                hrLine={index !== postData?.clashes.length - 1} // Show hrLine for all but the last clash
                postDateAndViews
                data={clash} // Render individual clash data
                key={clash?._id} // Use a unique key for each ClashCard
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
