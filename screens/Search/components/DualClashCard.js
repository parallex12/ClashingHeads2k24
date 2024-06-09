import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import { getPercent } from "../../../middleware";
import { calculateVotes, onShareApp } from "../../../utils";
import StandardButton from "../../../globalComponents/StandardButton";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { updateChallengeClash } from "../../../state-management/features/challengeClash/challengeClashSlice";

const DualClashCard = (props) => {
  let {
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
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const currentUser = useSelector(selectAuthUser)
  let challenger = data?.challenger;
  let opponent = data?.opponent;
  let voted = data?.voted
  let opinions = data?.opinions;
  let status = data?.status;
  let { challengerPercentage, opponentPercentage, opponentVotes, challengerVotes } = calculateVotes(data?.votes, data?.challengerId, data?.opponentId)


  const dispatch = useDispatch()

  const onVotePress = (selectedUserId) => {
    if (selectedUserId) {
      let updatedVotes = { ...data?.votes }
      updatedVotes[currentUser?.id] = selectedUserId
      dispatch(updateChallengeClash(data?.id, { votes: updatedVotes, voted: eval(data?.voted + 1) }))
    }
  }


  const ClashUserCard = ({
    user,
    type,
    audio,
    hasAccepted,
    shouldAccepted,
    votes
  }) => {

    let hasCurrentUserVoted = votes[currentUser?.id]

    return (
      <View style={styles.clashUserItem}>
        <View style={styles.clashUserProfile}>
          <Image
            source={{ uri: user?.profile_photo }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(14, "#000000", "Semibold", 3)}>{user?.realName}</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>{type}</Text>
        {audio && <WaveAudioPlayer showDuration iconSize={15} source={audio} />}

        {!hasAccepted ? (
          request_type == "Recieved" ? (
            <StandardButton
              title="Accept Request"
              customStyles={styles.requetBtn}
              textStyles={styles.requetBtnText}
              onPress={onAcceptRequest}
            />
          ) : request_type == "Sent" ? (
            <StandardButton
              title="Cancel Request"
              customStyles={styles.requetBtn}
              textStyles={styles.requetBtnText}
              onPress={onCancelRequest}
            />
          ) : null
        ) : null}

        {
          !hasCurrentUserVoted && status=="accepted" &&
          <StandardButton
            title="Vote Me"
            customStyles={styles.requetBtn}
            textStyles={styles.requetBtnText}
            onPress={() => onVotePress(user?.id)}
          />
        }
      </View>
    );
  };

  const CardFooter = ({ votes, opinions }) => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFooterItem}>
          <FontAwesome6 name="users" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            {voted} Voted
          </Text>
        </View>
        <TouchableOpacity style={styles.cardFooterItem} onPress={() => onClashesPress(data)}>
          <MaterialIcons name="multitrack-audio" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            {opinions} Opinions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardFooterItem} onPress={onReportPress}>
          <Image
            source={require("../../../assets/icons/post_cards/flag.png")}
            resizeMode="contain"
            style={{
              width: getPercent(4, width),
              height: getPercent(4, width),
            }}
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
            style={{
              width: getPercent(4, width),
              height: getPercent(4, width),
            }}
          />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const VotingFooter = () => {
    let cstyles = challengerVotes > opponentVotes ? styles?.votingItem : styles.votingItemOpponent
    let pstyles = opponentVotes > challengerVotes ? styles?.votingItem : styles.votingItemOpponent
    return (
      <View style={styles.votingFooterWrapper}>
        <View style={cstyles}>
          <Text style={styles.votingItemText}>{challengerPercentage}% ({challengerVotes} Votes)</Text>
          <Text style={styles.votingItemTextOpponent}>{challenger?.realName}</Text>
        </View>
        <View style={pstyles}>
          <Text style={styles.votingItemText}>{opponentPercentage}% ({opponentVotes} Votes)</Text>
          <Text style={styles.votingItemTextOpponent}>{opponent?.realName}</Text>
        </View>
      </View>
    )
  }

  const ClashesCard = ({ onPress }) => {
    return (
      <View
        style={styles.clashesCardCont}

      >
        <Text style={styles.clashesCardTitle}>“{data?.title}”</Text>
        <TouchableOpacity style={styles.clashesCardUsersCont}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <ClashUserCard
            votes={data?.votes}
            user={challenger}
            audio={data?.challenger_audio}
            type="Challenger"
            hasAccepted={true}
          />
          <Text style={styles.vsText}>VS</Text>
          <ClashUserCard
            votes={data?.votes}
            user={opponent}
            audio={data?.opponent_audio}
            type="Opponent"
            hasAccepted={status == "accepted"}
          />
        </TouchableOpacity>
        <CardFooter votes={voted} opinions={opinions} />
        {showVoting && <VotingFooter />}

      </View>
    );
  };

  return <ClashesCard onPress={onPress} />;
};

export default DualClashCard;
