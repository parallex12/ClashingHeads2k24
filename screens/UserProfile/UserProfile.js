import {
  RefreshControl,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/UserProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useRef, useState } from "react";
import { getPercent } from "../../middleware";
import ContentLoader, { Instagram } from "react-content-loader/native";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import UserApi from "../../ApisManager/UserApi";
import PostApi from "../../ApisManager/PostApi";
import { useQuery } from "react-query";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  const bottomFlagSheetRef = useRef();
  const { getUserProfileById } = new UserApi();
  const { getUsersPosts } = new PostApi();
  const usersQuery = useQuery(
    ["userProfile", user?._id],
    () => getUserProfileById(user?._id),
    {
      enabled: !!user?._id,
    }
  );
  const postsQuery = useQuery(
    ["userPosts", user?._id],
    () => getUsersPosts(user?._id),
    {
      enabled: !!user?._id,
    }
  );

  const onRefresh = async () => {
    await usersQuery.refetch();
    await postsQuery.refetch();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={usersQuery?.isRefetching || postsQuery?.isRefetching}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.content}>
          {usersQuery?.isLoading || postsQuery?.isLoading ? (
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
              <ProfileCard
                postsCount={postsQuery?.data?.posts?.length}
                user={usersQuery?.data?.user || user}
              />
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

export default UserProfile;
