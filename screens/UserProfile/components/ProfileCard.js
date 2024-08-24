import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ProfileCardstyles as _styles } from "../../../styles/UserProfile/main";
import { font } from "../../../styles/Global/main";
import { getPercent } from "../../../middleware";
import StandardButton from "../../../globalComponents/StandardButton";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { download } from "react-native-compressor";
import CardHeader from "./CardHeader";
import UserApi from "../../../ApisManager/UserApi";
import { useMutation, useQueryClient } from "react-query";
import useUserProfile from "../../../Hooks/useUserProfile";

const ProfileCard = (props) => {
  let { user, query } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();

  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());
  // Access cached data directly
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const current_user = userDataCached?.user;
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const [currentFollowButtonState, setCurrentFollowButtonState] = useState();
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState();
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState();
  const [downloadedAudio, setDownloadedAudio] = useState(null);
  const { followUser, unfollowUser } = new UserApi();
  const userProfile = useUserProfile();

  useEffect(() => {
    setIsCurrentUserFollower(
      user?.followers?.find((e) => e?._id == current_user?._id)
    );
    setIsCurrentUserFollowing(
      user?.following?.find((e) => e?._id == current_user?._id)
    );
  }, [user?.following, user?.followers]);

  useEffect(() => {
    setCurrentFollowButtonState(
      isCurrentUserFollower
        ? followButtonTypes[0]
        : isCurrentUserFollowing
        ? followButtonTypes[2]
        : followButtonTypes[1]
    );
    return () => {
      sound.current && sound.current.unloadAsync();
    };
  }, [isCurrentUserFollowing, isCurrentUserFollower]);

  const downloadCompressedAudio = async (url) => {
    const downloadFileUrl = await download(url, (progress) => {});
    setDownloadedAudio(downloadFileUrl);
  };

  useEffect(() => {
    if (user?.about_voice) {
      downloadCompressedAudio(user?.about_voice);
    }
  }, [user?.about_voice]);

  const playAudio = async () => {
    try {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!sound.current._loaded) {
          await sound.current.loadAsync({ uri: downloadedAudio });
        }
        await sound.current.playAsync();
        setIsPlaying(true);
        sound.current.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            sound.current.unloadAsync();
          }
        });
      }
    } catch (error) {
      console.log("Error playing audio", error);
      sound.current.unloadAsync();
    }
  };

  const onFollow = async () => {
    if (!current_user || !user) return;
    if (
      currentFollowButtonState == "Follow" ||
      currentFollowButtonState == "Follow back"
    ) {
      setIsCurrentUserFollower(current_user);
      await followUser(current_user?._id, user?._id);
      await queryClient.invalidateQueries({
        queryKey: ["currentUserProfile"],
        stale: true,
        refetchPage: true,
        exact: true,
      });
      await userProfile.refetch();
    }

    if (currentFollowButtonState == "Following") {
      setIsCurrentUserFollower(null);
      await unfollowUser(current_user?._id, user?._id);
      await queryClient.invalidateQueries({
        queryKey: ["currentUserProfile"],
        stale: true,
        refetchPage: true,
        exact: true,
      });
      await userProfile.refetch();
    }
  };

  const onMessage = () => {
    navigation.navigate("ChatScreen", {
      chat_data: {
        participants: [current_user, user],
        messages: [],
        _id: null,
      },
    });
  };

  return (
    <View style={styles.container}>
      <CardHeader user={user} />
      <View style={styles.userInfoWrapper}>
        <View style={styles.usernameWrapper}>
          <Text style={font(19, "#111827", "Medium", 2)}>
            <Text style={font(19, "#DB2727", "Semibold", 2)}>
              #{user?.clashHash}{" "}
            </Text>
            {user?.realName || ""}
          </Text>
          <Image
            source={require("../../../assets/icons/mStarIcon.png")}
            resizeMode="contain"
            style={{
              width: getPercent(2, height),
              height: getPercent(2, height),
              marginLeft: 5,
            }}
          />
        </View>
        <Text style={font(15, "#6B7280", "Regular", 2)}>{user?.politics}</Text>
        <Text style={font(13, "#DB2727", "Semibold", 2)}>
          @{user?.username}{" "}
        </Text>
      </View>
      {user?.bio && (
        <View style={styles.bioEditwrapper}>
          <Text style={font(14, "#6B7280", "Regular")}>{user?.bio}</Text>
        </View>
      )}
      {user?.school && (
        <View style={styles.bioEditwrapper}>
          <Text style={font(14, "#6B7280", "Regular")}>{user?.school}</Text>
        </View>
      )}
      {user?.employment && (
        <View style={styles.bioEditwrapper}>
          <Text style={font(14, "#6B7280", "Regular")}>{user?.employment}</Text>
        </View>
      )}
      <View style={styles.action_buttons_wrapper}>
        <StandardButton
          title={isPlaying ? "Pause" : "Listen"}
          customStyles={styles.listenButton}
          rightIcon={
            <View style={styles.volumeIcon}>
              <Image
                source={
                  isPlaying
                    ? require("../../../assets/icons/bgPause.png")
                    : require("../../../assets/icons/volume-high.png")
                }
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          }
          onPress={playAudio}
        />
        <StandardButton
          title={currentFollowButtonState}
          customStyles={styles.followButton}
          onPress={onFollow}
        />
        <StandardButton
          title="Message"
          customStyles={styles.messageButton}
          textStyles={{ color: "#121212" }}
          onPress={onMessage}
        />
      </View>
    </View>
  );
};

export default ProfileCard;
