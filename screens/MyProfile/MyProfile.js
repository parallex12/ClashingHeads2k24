import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import DualClashCard from "../Search/components/DualClashCard";
import VoiceRecorderBottomSheet from "../ChallengeRequests/components/VoiceRecorderBottomSheet";
import { setUserDetails } from "../../state-management/features/auth/authSlice";
import ContentLoader, { Instagram } from "react-content-loader/native";
import { get_user_profile } from "../../state-management/apiCalls/auth";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { _id, posts } = useSelector(selectAuthUser);
  let userID = _id;
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomVoiceSheetRef = useRef();
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
              {posts?.map((item, index) => {
                if (item?.clashType == "challenge") {
                  return (
                    <DualClashCard
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
                    onReportPress={() => bottomFlagSheetRef?.current?.present()}
                    onPostClashesPress={() =>
                      props?.navigation?.navigate("ClashDetails", { ...item })
                    }
                  />
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
      <VoiceRecorderBottomSheet
        challengeId={currentChallenge}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
      />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
