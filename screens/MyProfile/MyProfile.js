import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { setUserDetails } from "../../state-management/features/auth/authSlice";
import ContentLoader, { Instagram } from "react-content-loader/native";
import { get_user_profile } from "../../state-management/apiCalls/auth";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { _id, posts } = useSelector(selectAuthUser);
  let userID = _id;
  const [loading, setLoading] = useState(false);
  const bottomFlagSheetRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID) {
      get_user_profile(userID)
        .then((res) => {
          dispatch(setUserDetails(res));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userID]);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
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
