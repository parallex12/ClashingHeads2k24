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
import { selectAuthUser } from "../../../state-management/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { download } from "react-native-compressor";
import {
  follow_user,
  unfollow_user,
} from "../../../state-management/apiCalls/userRelation";
import CardHeader from "./CardHeader";

const ProfileCard = (props) => {
  let { user } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  let {
    realName,
    about_voice,
    clashHash,
    politics,
    bio,
    school,
    employment,
    username,
    _id,
    following,
    followers,
  } = user;

  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());
  const dispatch = useDispatch();
  const current_user = useSelector(selectAuthUser);
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const [currentFollowButtonState, setCurrentFollowButtonState] = useState();
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState();
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState();
  const [downloadedAudio, setDownloadedAudio] = useState(null);

  useEffect(() => {
    setIsCurrentUserFollower(
      followers?.find((e) => e?._id == current_user?._id)
    );
    setIsCurrentUserFollowing(
      following?.find((e) => e?._id == current_user?._id)
    );
  }, [following, followers]);

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

  const downloadCompressedAudio = async () => {
    const downloadFileUrl = await download(about_voice, (progress) => {});
    setDownloadedAudio(downloadFileUrl);
  };

  useEffect(() => {
    if (about_voice) {
      downloadCompressedAudio();
    }
  }, [about_voice]);

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

  const onFollow = () => {
    if (!current_user || !user) return;
    if (
      currentFollowButtonState == "Follow" ||
      currentFollowButtonState == "Follow back"
    ) {
      setIsCurrentUserFollower(current_user);
      follow_user(current_user?._id, _id);
      return;
    }

    if (currentFollowButtonState == "Following") {
      setIsCurrentUserFollower(null);
      unfollow_user(current_user?._id, _id);
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

  const onBioEditPress = () => {
    navigation.navigate("AddBio");
  };

  return (
    <View style={styles.container}>
      <CardHeader user={user} />
      <View style={styles.userInfoWrapper}>
        <View style={styles.usernameWrapper}>
          <Text style={font(16, "#111827", "Medium", 2)}>
            <Text style={font(16, "#", "Semibold", 2)}>#{clashHash} </Text>
            {realName || ""}
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
        <Text style={font(12, "#6B7280", "Regular", 2)}>{politics}</Text>
        <Text style={font(10, "#DB2727", "Semibold", 2)}>@{username} </Text>
      </View>
      {bio && (
        <TouchableOpacity
          style={styles.bioEditwrapper}
          onPress={onBioEditPress}
        >
          <View style={styles.bioicons}>
            <Image
              source={require("../../../assets/icons/profile_photo_icon.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text style={font(11, "#6B7280", "Regular", 2)}>{bio}</Text>
        </TouchableOpacity>
      )}
      {school && (
        <TouchableOpacity
          style={styles.bioEditwrapper}
          onPress={onBioEditPress}
        >
          <View style={styles.bioicons}>
            <Image
              source={require("../../../assets/icons/school.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text style={font(11, "#6B7280", "Regular", 2)}>{school}</Text>
        </TouchableOpacity>
      )}
      {employment && (
        <TouchableOpacity
          style={styles.bioEditwrapper}
          onPress={onBioEditPress}
        >
          <View style={styles.bioicons}>
            <Image
              source={require("../../../assets/icons/employee.png")}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <Text style={font(11, "#6B7280", "Regular", 2)}>{employment}</Text>
        </TouchableOpacity>
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
