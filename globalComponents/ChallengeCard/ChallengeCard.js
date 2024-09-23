import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  useContext,
} from "react";
import {
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ChallengeCardStyles as _styles } from "../../styles/Global/main";
import { onShareApp } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../globalComponents/PostCard/components/Content";
import ClashUserCard from "./components/ClashUserCard";
import CardFooter from "./components/CardFooter";
import VotingFooter from "./components/VotingFooter";
import PostActionsSheetContext from "../BottomSheet/PostActionsSheetProvider";
import FlagReportSheetContext from "../BottomSheet/FlagReportSheetProvider";

const ChallengeCard = (props) => {
  const {
    data,
    request_type,
    onAcceptRequest,
    onCancelRequest,
    onPress,
    onClashesPress,
    onReportPress,
    showVoting,
    divider,
  } = props;

  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const dispatch = useDispatch();
  const [voteData, setVoteData] = useState(null);
  let { opponent } = data;

  let challenger = data?.author;

  useEffect(() => {
    let votes = { ...data?.votes };
    setVoteData(votes);
  }, [data]);

  return (
    <View
      style={[
        styles.clashesCardWrapper,
        {
          borderBottomWidth: divider ? 10 : 0,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.clashesCardCont}
        onPress={onPress}
      >
        <View style={styles.body}>
          <Text style={styles.clashesCardTitle}>{data?.title}</Text>
          <View style={styles.clashesCardUsersCont} activeOpacity={0.8}>
            {challenger && (
              <ClashUserCard
                onAcceptRequest={onAcceptRequest}
                onCancelRequest={onCancelRequest}
                user={challenger}
                type="Challenger"
                audio={data?.recording}
                hasAccepted={true}
                votes={voteData}
                request_type={request_type}
                showVoting={showVoting}
                status={data?.status}
                _id={data?._id}
                setVoteData={setVoteData}
              />
            )}
            <Text style={styles.vsText}>VS</Text>
            <ClashUserCard
              onAcceptRequest={onAcceptRequest}
              onCancelRequest={onCancelRequest}
              user={opponent}
              type="Opponent"
              audio={data?.opponent_audio}
              hasAccepted={data?.status === "live"}
              votes={voteData}
              request_type={request_type}
              showVoting={showVoting}
              status={data?.status}
              _id={data?._id}
              setVoteData={setVoteData}
            />
          </View>
          <Content {...data} desc_limit={5} recording={null} title={null} />
        </View>

        <CardFooter
          votes={data?.votes}
          status={data?.status}
          clashes={data?.clashes}
          onShareApp={onShareApp}
          onClashesPress={onClashesPress}
        />
        {showVoting && (
          <VotingFooter
            voteData={voteData}
            challenger={challenger}
            opponent={opponent}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeCard;
