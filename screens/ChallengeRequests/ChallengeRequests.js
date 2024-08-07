import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeRequests/main";
import { useEffect, useMemo, useRef, useState } from "react";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { TouchableOpacity } from "react-native";
import { font } from "../../styles/Global/main";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import { get_challenge_by_user } from "../../state-management/apiCalls/challengeClash";
import { Instagram } from "react-content-loader/native";
import { update_post_by_id } from "../../state-management/apiCalls/post";
import { uploadMedia } from "../../middleware/firebase";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";

const ChallengeRequests = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [activeFilter, setActiveFilter] = useState("Sent");
  let filtersOption = ["Sent", "Recieved"];
  const bottomVoiceSheetRef = useRef();
  const user = useSelector(selectAuthUser);
  const [loading, setLoading] = useState(true);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challenges, setChallenges] = useState([]);

  const getUserChallenges = async () => {
    let challenges = await get_challenge_by_user(user?._id);
    setChallenges(challenges);
    setLoading(false);
  };

  useEffect(() => {
    getUserChallenges();
  }, []);

  const memoizedRequestsRecieved = useMemo(() => {
    return challenges?.filter((e) => {
      const isReceived = e?.opponent?._id === user?._id;
      return isReceived && e;
    });
  }, [activeFilter, user?._id, challenges]);

  const memoizedRequestsSent = useMemo(() => {
    return challenges?.filter((e) => {
      const isSent = e?.author?._id === user?._id;
      return isSent && e;
    });
  }, [activeFilter, user?._id, challenges]);


  const FilterItem = ({ data, index, count }) => {
    let conditional_style = {
      backgroundColor: activeFilter == data ? "rgba(219,39,39,0.1)" : "#fff",
      textColor: activeFilter == data ? "#DB2727" : "#111827",
    };
    return (
      <TouchableOpacity
        style={[
          styles.filterItem,
          { backgroundColor: conditional_style?.backgroundColor },
        ]}
        onPress={() => setActiveFilter(data)}
      >
        <Text style={font(12, conditional_style?.textColor, "Medium")}>
          {data + " " + count}
        </Text>
      </TouchableOpacity>
    );
  };

  const memoizedRequests = useMemo(() => {
    return activeFilter == "Sent"
      ? memoizedRequestsSent
      : memoizedRequestsRecieved;
  }, [activeFilter, user?._id, challenges]);

  const onPostChallenge = async (argData) => {
    if (!argData?.recording) return;
    let { url } = await uploadMedia(argData?.recording, "post_recordings");
    let updatedData = {
      status: "live",
      opponent_audio: url,
    };
    setChallenges((prev) => {
      return prev.map((e) => {
        if (e._id === currentChallenge) {
          return {
            ...e,
            status: "live",
            opponent_audio: argData?.recording,
          };
        }
        return e;
      });
    });

    await update_post_by_id(currentChallenge, updatedData);
    alert("Congrats! Challenge is live now.");
  };

  return (
    <View style={styles.container}>
      <StandardHeader title="Challenge Requests" backButton />
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filtersOption?.map((item, index) => {
            return (
              <FilterItem
                key={index}
                index={index}
                data={item}
                count={
                  item == "Sent"
                    ? memoizedRequestsSent?.length
                    : memoizedRequestsRecieved?.length
                }
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {loading ? (
            <Instagram />
          ) : (
            memoizedRequests?.map((item, index) => {
              return (
                <ChallengeCard
                  onAcceptRequest={() => {
                    alert("Record your opinion to accept the challenge.");
                    setCurrentChallenge(item?._id);
                    bottomVoiceSheetRef.current?.present();
                  }}
                  onPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onClashesPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onCancelRequest={() => null}
                  request_type={activeFilter}
                  key={index}
                  data={item}
                />
              );
            })
          )}
        </View>
      </ScrollView>
      <UpdatedVoiceRecorderBottomSheet
        clashTo={"challenge"}
        postId={currentChallenge}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
        onPostClash={onPostChallenge}
      />
    </View>
  );
};

export default ChallengeRequests;
