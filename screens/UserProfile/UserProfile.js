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
import { selectAuthUser } from "../../state-management/features/auth";
import ContentLoader, { Instagram } from "react-content-loader/native";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const { posts, allRequests, loading, relatedUser } = useSelector(
    (state) => state.challengeRequests
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPostsAndChallenges(user?.id));
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          {loading || !relatedUser ? (
            <View style={styles.ContentLoader}>
              <ContentLoader style={{ flex: 1 }} />
              {new Array(2).fill().map((item, index) => {
                return <Instagram style={{ alignSelf: "center" }} />;
              })}
            </View>
          ) : (
            <>
              <ProfileCard postsCount={posts?.length} user={relatedUser} />

              {posts?.map((item, index) => {
                if (index > 10) return;
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
                if (index > 10) return;
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
            </>
          )}
        </View>
      </ScrollView>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default UserProfile;
