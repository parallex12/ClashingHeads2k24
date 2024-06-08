import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeRequests/main";
import { useEffect, useMemo, useRef, useState } from "react";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import {
  fetchAllChallengeRequests,
  updateChallengeRequestForUser,
} from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import { selectChallengeClashRequests } from "../../state-management/features/challengeRequests";
import DualClashCard from "../Search/components/DualClashCard";
import Header from "../Search/components/Header";
import { TouchableOpacity } from "react-native";
import { font } from "../../styles/Global/main";
import VoiceRecorderBottomSheet from "./components/VoiceRecorderBottomSheet";

const ChallengeRequests = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [activeFilter, setActiveFilter] = useState("Sent");
  let filtersOption = ["Sent", "Recieved"];
  const bottomVoiceSheetRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const { allRequests, error } = useSelector(selectChallengeClashRequests);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllChallengeRequests(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  const memoizedRequestsRecieved = useMemo(() => {
    return allRequests?.filter((e) => {
      const isReceived = e?.opponentId === user?.id;
      return isReceived && e;
    });
  }, [allRequests, activeFilter, user?.id]);

  const memoizedRequestsSent = useMemo(() => {
    return allRequests?.filter((e) => {
      const isSent = e?.challengerId === user?.id;
      return isSent && e;
    });
  }, [allRequests, activeFilter, user?.id]);

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
  }, [allRequests, activeFilter, user?.id]);

  const onAcceptChallenge = (id) => {
    alert("Record your opinion to accept the challenge.");
    bottomVoiceSheetRef.current?.present();
    // dispatch(updateChallengeRequestForUser(id, { status: "accepted" }))
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
          {memoizedRequests?.map((item, index) => {
            return (
              <DualClashCard
                onAcceptRequest={() => {
                  console.log(item?.id);
                  alert("Record your opinion to accept the challenge.");
                  setCurrentChallenge(item?.id);
                  bottomVoiceSheetRef.current?.present();
                }}
                onCancelRequest={() => null}
                request_type={activeFilter}
                key={index}
                data={item}
              />
            );
          })}
        </View>
      </ScrollView>
      <VoiceRecorderBottomSheet
        challengeId={currentChallenge}
        bottomVoiceSheetRef={bottomVoiceSheetRef}
      />
    </View>
  );
};

export default ChallengeRequests;
