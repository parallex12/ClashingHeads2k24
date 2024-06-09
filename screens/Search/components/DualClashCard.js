import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import { getPercent } from "../../../middleware";
import { calculateVotes, onShareApp } from "../../../utils";
import StandardButton from "../../../globalComponents/StandardButton";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { updateChallengeClash } from "../../../state-management/features/challengeClash/challengeClashSlice";
import { RFValue } from "react-native-responsive-fontsize";

const DualClashCard = (props) => {
  const {
    data,
    request_type,
    onAcceptRequest,
    onCancelRequest,
    onPress,
    totalClashes,
    onClashesPress,
    onReportPress,
    views,
    onProfilePress,
    showVoting,
    postDateAndViews,
  } = props;

  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const currentUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const [voteData, setVoteData] = useState(data?.votes);
  const hasCurrentUserVoted = voteData[currentUser?.id];

  useEffect(() => {
    setVoteData(data?.votes);
  }, [data?.votes]);

  const {
    challengerPercentage,
    opponentPercentage,
    opponentVotes,
    challengerVotes,
  } = calculateVotes(voteData, data?.challengerId, data?.opponentId);

  const onVotePress = useCallback(
    (selectedUserId, hasCurrentUserVoted) => {
      const updatedVotes = { ...voteData };
      if (hasCurrentUserVoted) {
        if (hasCurrentUserVoted === selectedUserId) {
          delete updatedVotes[currentUser?.id];
          dispatch(
            updateChallengeClash(data?.id, {
              votes: updatedVotes,
              voted: data?.voted - 1,
            })
          );
        } else {
          updatedVotes[currentUser?.id] = selectedUserId;
          dispatch(updateChallengeClash(data?.id, { votes: updatedVotes }));
        }
      } else {
        updatedVotes[currentUser?.id] = selectedUserId;
        dispatch(
          updateChallengeClash(data?.id, {
            votes: updatedVotes,
            voted: data?.voted + 1,
          })
        );
      }
      setVoteData(updatedVotes);
    },
    [currentUser, data?.id, voteData, dispatch, data?.voted]
  );
  const ClashUserCard = memo(({ user, type, audio, hasAccepted, votes }) => {
    return (
      <View style={styles.clashUserItem}>
        <View style={styles.clashUserProfile}>
          <Image
            source={{ uri: user?.profile_photo }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
            cachePolicy="memory-disk"
          />
        </View>
        <Text style={font(14, "#000000", "Semibold", 3)}>{user?.realName}</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>{type}</Text>
        {audio && <WaveAudioPlayer showDuration iconSize={15} source={audio} />}
        {!hasAccepted &&
          (request_type === "Received" ? (
            <StandardButton
              title="Accept Request"
              customStyles={styles.requetBtn}
              textStyles={styles.requetBtnText}
              onPress={onAcceptRequest}
            />
          ) : request_type === "Sent" ? (
            <StandardButton
              title="Cancel Request"
              customStyles={styles.requetBtn}
              textStyles={styles.requetBtnText}
              onPress={onCancelRequest}
            />
          ) : null)}
        {data?.status === "accepted" && showVoting && (
          <StandardButton
            title={hasCurrentUserVoted === user?.id ? "THANKS" : "VOTE ME"}
            rightIcon={
              <Entypo name="thumbs-up" size={RFValue(12)} color="#fff" />
            }
            customStyles={styles.requetBtn}
            textStyles={styles.requetBtnText}
            onPress={() => onVotePress(user?.id, hasCurrentUserVoted)}
          />
        )}
      </View>
    );
  });

  const CardFooter = memo(() => (
    <View style={styles.cardFooterWrapper}>
      <View style={styles.cardFooterItem}>
        <FontAwesome6 name="users" size={15} color="#6B7280" />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
        >
          {data?.voted} Voted
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cardFooterItem}
        onPress={() => onClashesPress(data)}
      >
        <MaterialIcons name="multitrack-audio" size={15} color="#6B7280" />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
        >
          {data?.opinions} Opinions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardFooterItem} onPress={onReportPress}>
        <Image
          source={require("../../../assets/icons/post_cards/flag.png")}
          resizeMode="contain"
          style={{ width: getPercent(4, width), height: getPercent(4, width) }}
        />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
        >
          Report
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cardFooterItem}
        onPress={() => onShareApp()}
      >
        <Image
          source={require("../../../assets/icons/post_cards/share.png")}
          resizeMode="contain"
          style={{ width: getPercent(4, width), height: getPercent(4, width) }}
        />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
        >
          Share
        </Text>
      </TouchableOpacity>
    </View>
  ));

  const VotingFooter = memo(() => {
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
            {data?.challenger?.realName}
          </Text>
        </View>
        <View style={style2}>
          <Text style={styles.votingItemText}>
            {opponentPercentage}% ({opponentVotes} Votes)
          </Text>
          <Text style={styles.votingItemTextOpponent}>
            {data?.opponent?.realName}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.clashesCardCont}>
      <Text style={styles.clashesCardTitle}>“{data?.title}”</Text>
      <TouchableOpacity
        style={styles.clashesCardUsersCont}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <ClashUserCard
          user={data?.challenger}
          type="Challenger"
          audio={data?.challenger_audio}
          hasAccepted={true}
          votes={voteData}
        />
        <Text style={styles.vsText}>VS</Text>
        <ClashUserCard
          user={data?.opponent}
          type="Opponent"
          audio={data?.opponent_audio}
          hasAccepted={data?.status === "accepted"}
          votes={voteData}
        />
      </TouchableOpacity>
      <CardFooter />
      {showVoting && <VotingFooter />}
    </View>
  );
};

export default DualClashCard;
