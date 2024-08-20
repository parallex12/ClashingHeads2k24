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
import { useDispatch } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { download } from "react-native-compressor";
import Content from "../../../globalComponents/PostCard/components/Content";
import CacheImage from "../../../globalComponents/CacheImage";
import PostApi from "../../../ApisManager/PostApi";
import { useQueryClient } from "react-query";

const DualClashCard = (props) => {
  const {
    data,
    request_type,
    onAcceptRequest,
    onCancelRequest,
    onPress,
    onClashesPress,
    onReportPress,
    showVoting,
    showAudioDuration,
  } = props;

  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [voteData, setVoteData] = useState(null);
  const [hasCurrentUserVoted, setHasCurrentUserVoted] = useState(null);
  let { opponent } = data;
  const postApi = new PostApi();
  let challenger = data?.author;

  const {
    challengerPercentage,
    opponentPercentage,
    opponentVotes,
    challengerVotes,
  } = calculateVotes(voteData, challenger?._id, opponent?._id);

  useEffect(() => {
    let votes = { ...data?.votes };
    setHasCurrentUserVoted(votes[currentUser?._id]);
    setVoteData(votes);
  }, [data]);

  const onVotePress = useCallback(
    async (selectedUserId, hasCurrentUserVoted) => {
      const updatedVotes = { ...voteData };
      if (hasCurrentUserVoted === selectedUserId) {
        delete updatedVotes[currentUser?._id];

        await postApi.updatePostById(data?._id, {
          votes: updatedVotes,
        });
      } else {
        updatedVotes[currentUser?._id] = selectedUserId;
        await postApi.updatePostById(data?._id, { votes: updatedVotes });
      }
      setHasCurrentUserVoted(updatedVotes[currentUser?._id]);
      setVoteData(updatedVotes);
    },
    [currentUser, voteData]
  );

  const ClashUserCard = memo(({ user, type, audio, hasAccepted, votes }) => {
    const [imageLoad, setImageLoad] = useState(true);
    const [downloadedAudio, setDownloadedAudio] = useState(null);
    const downloadCompressedAudio = async () => {
      try {
        const downloadFileUrl = await download(audio, (progress) => {});
        setDownloadedAudio(downloadFileUrl);
      } catch (e) {
        console.log(e, "issue");
      }
    };

    useEffect(() => {
      if (audio) {
        downloadCompressedAudio();
      }
    }, [audio]);

    return (
      <View style={styles.clashUserItem}>
        <TouchableOpacity
          style={styles.clashUserItemInner}
          onPress={() => {
            if (user?._id == currentUser?._id) {
              navigation?.navigate("MyProfile");
            } else {
              navigation?.navigate("UserProfile", {
                user: user,
              });
            }
          }}
        >
          <View style={styles.clashUserProfile}>
            {/* {imageLoad && user?.profile_hash && (
              <Blurhash
                blurhash={user?.profile_hash}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  zIndex: 999,
                }}
              />
            )} */}
            <CacheImage
              source={{ uri: user?.profile_photo }}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
              cachePolicy="memory-disk"
              onLoad={() => setImageLoad(false)}
            />
          </View>
          <Text style={font(14, "#000000", "Semibold", 3)}>
            {user?.realName}
          </Text>
          <Text style={font(12, "#9CA3AF", "Medium", 3)}>{type}</Text>
        </TouchableOpacity>
        {audio && (
          <WaveAudioPlayer
            showDuration={showAudioDuration}
            iconSize={15}
            source={downloadedAudio || audio}
          />
        )}
        {!hasAccepted &&
          (request_type === "Recieved" ? (
            <View style={styles.actionBtnRow}>
              <StandardButton
                rightIcon={<FontAwesome5 name="times" size={15} color="#fff" />}
                customStyles={styles.requetBtn}
                textStyles={styles.requetBtnText}
                onPress={onCancelRequest}
              />
              <StandardButton
                rightIcon={<Entypo name="check" size={15} color="#fff" />}
                customStyles={styles.acceptBtn}
                textStyles={styles.requetBtnText}
                onPress={onAcceptRequest}
              />
            </View>
          ) : request_type === "Sent" ? (
            <StandardButton
              title="Request Sent"
              customStyles={styles.VoteBtn}
              textStyles={styles.requetBtnText}
              onPress={onCancelRequest}
            />
          ) : null)}
        {data?.status === "live" && showVoting && (
          <StandardButton
            title={hasCurrentUserVoted === user?._id ? "THANKS" : "VOTE ME"}
            rightIcon={
              <Entypo name="thumbs-up" size={RFValue(12)} color="#fff" />
            }
            customStyles={styles.VoteBtn}
            textStyles={styles.requetBtnText}
            onPress={() => onVotePress(user?._id, hasCurrentUserVoted)}
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
          {Object.keys(data?.votes || {})?.length} Voted
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cardFooterItem}
        onPress={() =>
          data?.status == "pending"
            ? alert("Clash has not started yet. Awaiting approvals.")
            : onClashesPress(data)
        }
      >
        <MaterialIcons name="multitrack-audio" size={15} color="#6B7280" />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
        >
          {data?.clashes?.length} Opinions
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
            {challenger?.realName}
          </Text>
        </View>
        <View style={style2}>
          <Text style={styles.votingItemText}>
            {opponentPercentage}% ({opponentVotes} Votes)
          </Text>
          <Text style={styles.votingItemTextOpponent}>
            {opponent?.realName}
          </Text>
        </View>
      </View>
    );
  });

  return (
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
              user={challenger}
              type="Challenger"
              audio={data?.recording}
              hasAccepted={true}
              votes={voteData}
            />
          )}
          <Text style={styles.vsText}>VS</Text>
          {opponent && (
            <ClashUserCard
              user={opponent}
              type="Opponent"
              audio={data?.opponent_audio}
              hasAccepted={data?.status === "live"}
              votes={voteData}
            />
          )}
        </View>
        <Content {...data} desc_limit={2} recording={null} title={null} />
      </View>
      <CardFooter />
      {showVoting && <VotingFooter />}
    </TouchableOpacity>
  );
};

export default DualClashCard;
