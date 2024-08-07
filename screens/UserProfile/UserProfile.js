import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/UserProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useRef, useState } from "react";
import { getPercent } from "../../middleware";
import { useDispatch } from "react-redux";
import ContentLoader, { Instagram } from "react-content-loader/native";
import { get_user_profile } from "../../state-management/apiCalls/auth";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  let { posts } = profile;

  useEffect(() => {
    if (user?._id) {
      get_user_profile(user?._id)
        .then((res) => {
          setProfile(res);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user?._id]);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
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
