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
import {
  get_post_by_id,
  update_post_by_id,
} from "../../state-management/apiCalls/post";
import { selectAuthUser } from "../../state-management/features/auth";
import { create_clash } from "../../state-management/apiCalls/clash";

const ClashDetails = (props) => {
  let {} = props;
  const dispatch = useDispatch();
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashTo, setClashTo] = useState("post");
  const [postData, setPostData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  let prevPostData = props?.route?.params;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  let postId = prevPostData?._id;
  const { _id } = useSelector(selectAuthUser);

  useEffect(() => {
    get_post_by_id(postId)
      .then((res) => {
        let views = [...res?.views];
        if (!views?.includes(_id)) {
          views.push(_id);
          update_post_by_id(postId, { views });
        }
        setPostData(res);
        setRefreshing(false);
      })
      .catch((e) => {
        console.log(e);
        setRefreshing(false);
      });

    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, [dispatch, postId, refreshing]);

  const onPostClash = async (clashDetails) => {
    await create_clash(clashDetails);
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
