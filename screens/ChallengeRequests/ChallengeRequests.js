import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeRequests/main";
import { useEffect, useMemo, useRef, useState } from "react";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import {
  fetchUserPostsAndChallenges,
  updateChallengeRequestForUser,
} from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import { selectChallengeClashRequests } from "../../state-management/features/challengeRequests";
import DualClashCard from "../Search/components/DualClashCard";
import Header from "../Search/components/Header";
import { TouchableOpacity } from "react-native";
import { font } from "../../styles/Global/main";
import VoiceRecorderBottomSheet from "./components/VoiceRecorderBottomSheet";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";

const ChallengeRequests = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [activeFilter, setActiveFilter] = useState("Sent");
  let filtersOption = ["Sent", "Recieved"];
  const bottomVoiceSheetRef = useRef();
  const user = useSelector(selectAuthUser);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  let { challenges } = user;

  const memoizedRequestsRecieved = useMemo(() => {
    return challenges?.filter((e) => {
      const isReceived = e?.opponent?._id === user?._id;
      return isReceived && e;
    });
  }, [activeFilter, user?._id]);

  const memoizedRequestsSent = useMemo(() => {
    return challenges?.filter((e) => {
      const isSent = e?.challenger?._id === user?._id;
      return isSent && e;
    });
  }, [activeFilter, user?._id]);

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
  }, [activeFilter, user?._id]);

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
          {memoizedRequests?.map((item, index) => {
            return (
              <DualClashCard
                onAcceptRequest={() => {
                  alert("Record your opinion to accept the challenge.");
                  setCurrentChallenge(item?.id);
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
          })}
        </View>
      </ScrollView>
  
      <UpdatedVoiceRecorderBottomSheet
        clashTo={"challenge"}
        postId={currentChallenge?._id}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
        // onPostClash={onPostClash}
      />
    </View>
  );
};

export default ChallengeRequests;
