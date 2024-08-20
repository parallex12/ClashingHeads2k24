import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch } from "react-redux";
import ContentLoader, { Instagram } from "react-content-loader/native";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import UserApi from "../../ApisManager/UserApi";
import { RefreshControl } from "react-native-gesture-handler";
import PostApi from "../../ApisManager/PostApi";
import { useQuery } from "react-query";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const { getUserProfile } = new UserApi();
  const { getUsersPosts } = new PostApi();
  const usersQuery = useQuery(["currentUserProfile"], getUserProfile);
  const userId = usersQuery?.data?.user?._id;
  const postsQuery = useQuery(
    ["currentUserposts", userId],
    () => getUsersPosts(userId),
    {
      enabled: !!userId,
    }
  );

  const onRefresh = () => {
    usersQuery?.refetch()
    postsQuery?.refetch();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {postsQuery?.isLoading || usersQuery?.isLoading ? (
            <View style={styles.ContentLoader}>
              <ContentLoader style={{ flex: 1 }} />
              {new Array(2).fill().map((item, index) => {
                return <Instagram style={{ alignSelf: "center" }}  key={index} />;
              })}
            </View>
          ) : (
            <>
              <ProfileCard user_details={usersQuery?.data?.user} />
              <View style={styles.innercontent}>
                {postsQuery?.data?.posts?.map((item, index) => {
                  if (item?.clashType == "challenge") {
                    return (
                      <ChallengeCard
                        divider
                        onPress={() =>
                          props?.navigation?.navigate("ChallengeClash", {
                            ...item,
                          })
                        }
                        onClashesPress={() =>
                          props?.navigation?.navigate("ChallengeClash", {
                            ...item,
                          })
                        }
                        key={index}
                        data={item}
                      />
                    );
                  }
                  return (
                    <PostCard
                      divider
                      data={item}
                      key={index}
                      onReportPress={() =>
                        bottomFlagSheetRef?.current?.present()
                      }
                      onPostClashesPress={() =>
                        props?.navigation?.navigate("ClashDetails", { ...item })
                      }
                    />
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
