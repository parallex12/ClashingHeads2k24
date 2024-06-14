import {
  Image,
  ScrollView,
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
import { update_user_details } from "../../../middleware/firebase";
import { setUserDetails } from "../../../state-management/features/auth/authSlice";

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
    id,
  } = user;

  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());
  const dispatch = useDispatch();
  const current_user = useSelector(selectAuthUser);
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const currentUserfollowing = { ...current_user?.following } || {};
  const currentOtherUserfollowers = { ...user?.following } || {};
  const hasCurrentUserFollowed = currentUserfollowing[user?.id];
  const hasOpponentUserFollowed = currentOtherUserfollowers[current_user?.id];

  let currentFollowButtonState = hasCurrentUserFollowed
    ? followButtonTypes[0]
    : hasOpponentUserFollowed
    ? followButtonTypes[2]
    : followButtonTypes[1];

  useEffect(() => {
    return () => {
      sound.current && sound.current.unloadAsync();
    };
  }, []);

  const playAudio = async () => {
    try {
      if (isPlaying) {
        await sound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!sound.current._loaded) {
          await sound.current.loadAsync({ uri: about_voice });
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
    }
  };

  const onFollow = () => {
    if (!current_user || !user) return;

    if (
      currentFollowButtonState == "Follow" ||
      currentFollowButtonState == "Follow back"
    ) {
      currentUserfollowing[user?.id] = user;
      currentOtherUserfollowers[current_user?.id] = current_user;
      dispatch(
        setUserDetails({ ...current_user, following: currentUserfollowing })
      );
      update_user_details(current_user?.id, {
        following: currentUserfollowing,
      });
      update_user_details(user?.id, { followers: currentOtherUserfollowers });
      return;
    }

    if (currentFollowButtonState == "Following") {
      delete currentUserfollowing[user?.id];
      dispatch(
        setUserDetails({ ...current_user, following: currentUserfollowing })
      );
      update_user_details(current_user?.id, {
        following: currentUserfollowing,
      });
      if (hasCurrentUserFollowed && hasOpponentUserFollowed) {
        delete currentOtherUserfollowers[current_user?.id];
        update_user_details(user?.id, { followers: currentOtherUserfollowers });
      }
      return;
    }
  };

  const onMessage = () => {
    navigation.navigate("Messages");
  };
  const onFollowView = () => {
    navigation.navigate("Connections", user);
  };

  const CardHeader = ({ user }) => {
    return (
      <View style={styles.cardHeaderContainer}>
        <View style={styles.cardHeaderProfileWrapper}>
          <View style={styles.cardHeaderProfile}>
            <Image
              source={{ uri: user?.profile_photo }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.cardHeaderProfileOnlineDot}></View>
        </View>
        <View style={styles.post_following_followers_cont}>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>
              {user?.posts || 0}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.post_following_followers_Item}
            onPress={onFollowView}
          >
            <Text style={font(15, "#121212", "Bold", 3)}>
              {Object.keys(user?.followers || {})?.length}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.post_following_followers_Item}
            onPress={onFollowView}
          >
            <Text style={font(15, "#121212", "Bold", 3)}>
              {Object.keys(user?.following || {})?.length}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
            {realName}
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
