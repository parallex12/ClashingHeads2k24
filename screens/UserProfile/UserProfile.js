import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/UserProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts, home_posts } from "../../state-management/atoms/atoms";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useRef, useState } from "react";
import { getPercent } from "../../middleware";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsAndChallenges } from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import DualClashCard from "../Search/components/DualClashCard";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  let { profile_photo, about_voice, username, id } = user;
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();

  const { posts, allRequests, loading } = useSelector(
    (state) => state.challengeRequests
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPostsAndChallenges(id));
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <View style={styles.content}>
            <ProfileCard postsCount={posts?.length} user={user} />
            {posts?.map((item, index) => {
              return (
                <PostCard
                  divider
                  data={item}
                  key={index}
                  onReportPress={() => bottomFlagSheetRef?.current?.present()}
                  onPostClashesPress={() =>
                    props?.navigation?.navigate("ClashDetails", { ...item })
                  }
                />
              );
            })}
            {allRequests?.map((item, index) => {
              if (item?.status != "accepted") return;
              return (
                <DualClashCard
                  onCancelRequest={() => null}
                  request_type={"Senst"}
                  key={index}
                  data={item}
                  onPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onClashesPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      )}
      <BottomMenu active="Home" />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default UserProfile;
