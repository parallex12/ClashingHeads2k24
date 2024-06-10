import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ProfileCardstyles as _styles } from "../../../styles/MyProfile/main";
import { font } from "../../../styles/Global/main";
import { getPercent } from "../../../middleware";
import StandardButton from "../../../globalComponents/StandardButton";
import { Entypo, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";

const ProfileCard = (props) => {
  let { currentProfile, setCurrentProfile, postsCount } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_details = useSelector(selectAuthUser);
  const navigation = useNavigation();
  let {
    realName,
    about_voice,
    clashHash,
    followers,
    politics,
    following,
    bio,
    school,
    employment,
    username,
  } = user_details;

  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    return () => {
      sound.current && sound.current.unloadAsync();
    };
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentProfile({ uri: result.assets[0].uri });
    }
  };

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

  const CardHeader = () => {
    return (
      <View style={styles.cardHeaderContainer}>
        <View style={styles.cardHeaderProfileWrapper}>
          <View style={styles.cardHeaderProfile}>
            <Image
              source={currentProfile}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <TouchableOpacity
            style={styles.cardHeaderProfileCameraIcon}
            onPress={pickImage}
          >
            <AntDesign name="camerao" size={18} color="#DB2727" />
          </TouchableOpacity>
        </View>
        <View style={styles.post_following_followers_cont}>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>
              {postsCount || 0}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Posts</Text>
          </View>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>{followers || 0}</Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Followers</Text>
          </View>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>{following || 0}</Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Following</Text>
          </View>
        </View>
      </View>
    );
  };

  const onBioEditPress = () => {
    navigation.navigate("AddBio");
  };

  return (
    <View style={styles.container}>
      <CardHeader />
      <View style={styles.userInfoWrapper}>
        <View style={styles.usernameWrapper}>
          <Text style={font(16, "#111827", "Medium", 2)}>
            <Text style={font(16, "#DB2727", "Semibold", 2)}>#{clashHash} </Text>
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
      <TouchableOpacity style={styles.bioEditwrapper} onPress={onBioEditPress}>
        {!bio && (
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
        )}
        <Text style={font(11, "#6B7280", "Regular", 2)}>
          {bio || "Add your bio."}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bioEditwrapper} onPress={onBioEditPress}>
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
        <Text style={font(11, "#6B7280", "Regular", 2)}>
          {school || "Add School"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bioEditwrapper} onPress={onBioEditPress}>
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
        <Text style={font(11, "#6B7280", "Regular", 2)}>
          {employment || "Add Employment"}{" "}
        </Text>
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.settingsButton}>
          <Entypo name="dots-three-horizontal" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;
