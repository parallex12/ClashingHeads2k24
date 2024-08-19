import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../state-management/features/auth/authSlice";
import ContentLoader, { Instagram } from "react-content-loader/native";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import UserApi from "../../ApisManager/UserApi";
import { RefreshControl } from "react-native-gesture-handler";
import PostApi from "../../ApisManager/PostApi";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const userapi = new UserApi();
  const postApi = new PostApi();

  useEffect(() => {
    (async () => {
      const result = await userapi.getUserProfile();
      const postsRes = await postApi.getUsersPosts(result?.user?._id);
      dispatch(setUserDetails(result?.user || {}));
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {loading ? (
            <View style={styles.ContentLoader}>
              <ContentLoader style={{ flex: 1 }} />
              {new Array(2).fill().map((item, index) => {
                return <Instagram style={{ alignSelf: "center" }} />;
              })}
            </View>
          ) : (
            <>
              <ProfileCard />
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

export default MyProfile;
