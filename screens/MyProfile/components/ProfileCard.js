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
import * as ImagePicker from 'expo-image-picker';

const ProfileCard = (props) => {
  let { currentProfile, setCurrentProfile } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGES,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCurrentProfile({ uri: result.assets[0].uri });
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
          <TouchableOpacity style={styles.cardHeaderProfileCameraIcon} onPress={pickImage}>
            <AntDesign name="camerao" size={18} color="#DB2727" />
          </TouchableOpacity>
        </View>
        <View style={styles.post_following_followers_cont}>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>2</Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Posts</Text>
          </View>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>1422</Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Followers</Text>
          </View>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>452</Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Following</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <CardHeader />
      <View style={styles.userInfoWrapper}>
        <View style={styles.usernameWrapper}>
          <Text style={font(16, "#111827", "Medium", 2)}>Lefty AI</Text>
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
        <Text style={font(12, "#6B7280", "Regular", 2)}>
          Democrat - Los Angles,CA
        </Text>
        <Text style={font(12, "#121212", "Regular", 10)}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </Text>
      </View>
      <View style={styles.action_buttons_wrapper}>
        <StandardButton
          title="Listen"
          customStyles={styles.listenButton}
          rightIcon={
            <View style={styles.volumeIcon}>
              <Image
                source={require("../../../assets/icons/volume-high.png")}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          }
        />
        <TouchableOpacity style={styles.settingsButton}>
          <Entypo name="dots-three-horizontal" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileCard;
