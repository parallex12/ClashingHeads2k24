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
import { selectAuthDetailsLoading, selectAuthUser } from "../../state-management/features/auth";
import { fetchUserPostsAndChallenges } from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import DualClashCard from "../Search/components/DualClashCard";
import VoiceRecorderBottomSheet from "../ChallengeRequests/components/VoiceRecorderBottomSheet";
import auth from "@react-native-firebase/auth";
import { fetchCurrentUserDetails } from "../../state-management/features/auth/authSlice";
import ContentLoader, { Facebook } from 'react-content-loader'

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_details = useSelector(selectAuthUser);
  let userID=auth().currentUser?.uid
  const [currentProfile, setCurrentProfile] = useState({
    uri: user_details?.profile_photo || "",
  });
  const authLoading=useSelector(selectAuthDetailsLoading)
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const bottomVoiceSheetRef = useRef();
  const bottomFlagSheetRef = useRef();

  const { posts, allRequests, loading } = useSelector(
    (state) => state.challengeRequests
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID) {
      dispatch(fetchCurrentUserDetails(userID))
      dispatch(fetchUserPostsAndChallenges(userID));
    }
  }, [userID]);



  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      {loading || authLoading || !user_details ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <ProfileCard
              postsCount={posts?.length}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
            />
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
            {allRequests?.map((item, index) => {
              return (
                <DualClashCard
                  onAcceptRequest={() => {
                    console.log(item?.id);
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
            })}
          </View>
        </ScrollView>
      )}
      <BottomMenu active="menu" />
      <VoiceRecorderBottomSheet
        challengeId={currentChallenge}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
      />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
