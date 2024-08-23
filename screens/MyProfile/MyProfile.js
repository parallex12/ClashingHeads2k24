import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useMemo, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch } from "react-redux";
import ContentLoader, { Instagram } from "react-content-loader/native";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import { RefreshControl } from "react-native-gesture-handler";
import PostApi from "../../ApisManager/PostApi";
import { useQuery } from "react-query";
import useUserProfile from "../../Hooks/useUserProfile";
import useUsersPosts from "../../Hooks/useUsersPosts";
import FeedFlatlist from "../Home/components/FeedFlatlist";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const { getUsersPosts } = new PostApi();
  const userProfile = useUserProfile();
  const userId = userProfile?.data?.user?._id;
  const postsQuery = useUsersPosts(userId);
  const onRefresh = () => {
    userProfile?.refetch();
    postsQuery?.refetch();
  };

  const feedPages = useMemo(() => {
    return userFeed?.data;
  }, [userFeed]);

  const onPostActionsPress = () => {
    setPostInteraction(item);
    postActionsbottomSheetRef?.current?.present();
  };

  const onPostReport = () => {
    bottomFlagSheetRef?.current?.present();
  };

  console.log(postsQuery?.data);

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
          {postsQuery?.isLoading || userProfile?.isLoading ? (
            <View style={styles.ContentLoader}>
              <ContentLoader style={{ flex: 1 }} />
              {new Array(2).fill().map((item, index) => {
                return (
                  <Instagram style={{ alignSelf: "center" }} key={index} />
                );
              })}
            </View>
          ) : (
            <>
              <ProfileCard user_details={userProfile?.data?.user} />
              <FeedFlatlist
                feedPages={feedPages}
                userFeed={userFeed}
                onItemActionsPress={onPostActionsPress}
                onItemReportPress={onPostReport}
              />
              {/* <View style={styles.innercontent}>
                {postsQuery?.data?.map((item, index) => {
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
              </View> */}
            </>
          )}
        </View>
      </ScrollView>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
