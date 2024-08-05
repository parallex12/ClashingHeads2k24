import React, { memo } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { ChallengeCardStyles as _styles } from "../../../styles/Global/main";
import { calculateVotes } from "../../../utils";

const VotingFooter = memo((data) => {
  let { challenger, opponent,voteData } = data;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });

  const {
    challengerPercentage,
    opponentPercentage,
    opponentVotes,
    challengerVotes,
  } = calculateVotes(voteData, challenger?._id, opponent?._id);

  const style1 =
    challengerVotes > opponentVotes
      ? styles.votingItem
      : styles.votingItemOpponent;

  const style2 =
    opponentVotes > challengerVotes
      ? styles.votingItem
      : styles.votingItemOpponent;

  return (
    <View style={styles.votingFooterWrapper}>
      <View style={style1}>
        <Text style={styles.votingItemText}>
          {challengerPercentage}% ({challengerVotes} Votes)
        </Text>
        <Text style={styles.votingItemTextOpponent}>
          {challenger?.realName}
        </Text>
      </View>
      <View style={style2}>
        <Text style={styles.votingItemText}>
          {opponentPercentage}% ({opponentVotes} Votes)
        </Text>
        <Text style={styles.votingItemTextOpponent}>{opponent?.realName}</Text>
      </View>
    </View>
  );
});

export default VotingFooter;
