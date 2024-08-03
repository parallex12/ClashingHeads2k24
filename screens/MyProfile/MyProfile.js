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
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useEffect, useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthDetailsLoading,
  selectAuthUser,
} from "../../state-management/features/auth";
import { fetchUserPostsAndChallenges } from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import DualClashCard from "../Search/components/DualClashCard";
import VoiceRecorderBottomSheet from "../ChallengeRequests/components/VoiceRecorderBottomSheet";
import auth from "@react-native-firebase/auth";
import {
  fetchCurrentUserDetails,
  setUserDetails,
} from "../../state-management/features/auth/authSlice";
import ContentLoader, {
  Facebook,
  Instagram,
  Code,
} from "react-content-loader/native";
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

              {/* {allRequests?.map((item, index) => {
                if (index > 10) return;
                return (
                  <DualClashCard
                    onAcceptRequest={() => {
                      alert("Record your opinion to accept the challenge.");
                      setCurrentChallenge(item?.id);
                      bottomVoiceSheetRef.current?.present();
                    }}
                    onCancelRequest={() => null}
                    request_type={
                      item?.opponentId == user_details?.id ? "Recieved" : "Sent"
                    }
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
              })} */}
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
