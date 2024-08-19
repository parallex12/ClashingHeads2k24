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
import { useDispatch } from "react-redux";
import ContentLoader, { Instagram } from "react-content-loader/native";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import UserApi from "../../ApisManager/UserApi";
import PostApi from "../../ApisManager/PostApi";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const userApi = new UserApi();
  const postApi = new PostApi();

  useEffect(() => {
    (async () => {
      const result = await userApi.getUserProfileById(user?._id);
      const postsRes = await postApi.getUsersPosts(result?.user?._id);
      setProfile(result?.user);
      setPosts(postsRes?.posts);
      setLoading(false);
    })();
  }, [loading]);

  const onRefresh = () => {
    setLoading(true);
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
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {loading ? (
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
              <ProfileCard postsCount={posts?.length} user={profile || user} />
              <View style={styles.innercontent}>
                {posts?.map((item, index) => {
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
