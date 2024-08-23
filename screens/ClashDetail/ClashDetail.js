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
import { useDispatch } from "react-redux";
import ClashCard from "../../globalComponents/UniversalClashCard/ClashCard";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import PostApi from "../../ApisManager/PostApi";
import ClashApi from "../../ApisManager/ClashApi";
import { useQuery, useQueryClient } from "react-query";
import { Instagram } from "react-content-loader/native";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashTo, setClashTo] = useState("post");
  const [refreshing, setRefreshing] = useState(false);
  const bottomVoiceSheetRef = useRef(null);
  const bottomFlagSheetRef = useRef(null);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const { _id } = userDataCached?.user;
  const { updatePostById } = new PostApi();
  const { getClashesByPostId, createClash } = new ClashApi();
  let prevPostData = props?.route?.params;
  let openVoiceSheet = props?.route?.params?.openVoiceSheet;
  let postId = prevPostData?._id;

  const clashesQuery = useQuery(
    ["challengeClashes", postId],
    () => getClashesByPostId(postId),
    {
      enabled: !!postId,
      staleTime: 60000,
      onSuccess: async (data) => {
        try {
          let views = [...prevPostData?.views];
          if (!views?.includes(_id)) {
            views?.push(_id);
            result = await updatePostById(postId, { views });
          }
        } catch (e) {
          console.log(e);
        }
      },
    }
  );

  useEffect(() => {
    if (openVoiceSheet) {
      bottomVoiceSheetRef.current.present();
    }
  }, []);

  const onPostClash = async (clashDetails) => {
    await createClash(clashDetails);
    clashesQuery.refetch();
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
            data={prevPostData} // Render post data from Redux state
            onPostClashesPress={() => bottomVoiceSheetRef.current?.present()}
            onReportPress={() => bottomFlagSheetRef?.current?.present()}
            views={prevPostData?.views?.length}
            onProfilePress={() => props?.navigation?.navigate("UserProfile")}
          />
          <View style={styles.clashes_wrapper}>
            {clashesQuery?.isLoading ? (
              <Instagram style={{ alignSelf: "center" }} />
            ) : (
              clashesQuery?.data.clashes?.map((clash, index) => (
                <ClashCard
                  user_id={_id}
                  hrLine={index !== clashesQuery?.data.clashes?.length - 1} // Show hrLine for all but the last clash
                  postDateAndViews
                  data={clash} // Render individual clash data
                  key={clash?._id} // Use a unique key for each ClashCard
                  onPostClashesPress={() => {
                    setClashTo(clash);
                    bottomVoiceSheetRef.current?.present();
                  }}
                  onReportPress={() => bottomFlagSheetRef?.current?.present()}
                />
              ))
            )}
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
