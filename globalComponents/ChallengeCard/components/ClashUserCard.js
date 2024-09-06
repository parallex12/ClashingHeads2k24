import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ChallengeCardStyles as _styles } from "../../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import StandardButton from "../../../globalComponents/StandardButton";
import { FontAwesome5 } from "@expo/vector-icons";
import CacheImage from "../../../globalComponents/CacheImage";
import { useNavigation } from "@react-navigation/native";
import PostApi from "../../../ApisManager/PostApi";
import { useQueryClient } from "react-query";
import FastImage from "react-native-fast-image";

const ClashUserCard = memo((data) => {
  let {
    user,
    type,
    audio,
    hasAccepted,
    request_type,
    onCancelRequest,
    onAcceptRequest,
    showAudioDuration,
    showVoting,
    votes,
    _id,
    setVoteData,
  } = data;

  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const navigation = useNavigation();
  const [hasCurrentUserVoted, setHasCurrentUserVoted] = useState(null);
  const postApi = new PostApi();

  useEffect(() => {
    if (!votes) return;
    setHasCurrentUserVoted(votes[currentUser?._id]);
  }, [votes]);

  const onVotePress = useCallback(
    async (selectedUserId) => {
      const updatedVotes = { ...votes };
      if (hasCurrentUserVoted === selectedUserId) {
        delete updatedVotes[currentUser?._id];

        await postApi.updatePostById(_id, {
          votes: updatedVotes,
        });
      } else {
        updatedVotes[currentUser?._id] = selectedUserId;
        await postApi.updatePostById(_id, { votes: updatedVotes });
      }
      setHasCurrentUserVoted(updatedVotes[currentUser?._id]);
      setVoteData(updatedVotes);
    },
    [currentUser, votes]
  );

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
          <FastImage
            source={{
              uri: user?.profile_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(17, "#000000", "Semibold", 3)}>{user?.realName}</Text>
        <Text style={font(15, "#9CA3AF", "Medium")}>{type}</Text>
      </TouchableOpacity>
      {audio && (
        <WaveAudioPlayer
          showDuration={showAudioDuration}
          iconSize={15}
          source={audio}
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
            title="Cancel"
            customStyles={styles.VoteBtn}
            textStyles={styles.requetBtnText}
            onPress={onCancelRequest}
          />
        ) : null)}
      {data?.status === "live" && showVoting && (
        <StandardButton
          title={hasCurrentUserVoted === user?._id ? "THANKS" : "VOTE ME"}
          rightIcon={<Entypo name="thumbs-up" size={15} color="#fff" />}
          customStyles={styles.VoteBtn}
          textStyles={styles.requetBtnText}
          onPress={() => onVotePress(user?._id)}
        />
      )}
    </View>
  );
});

export default ClashUserCard;
