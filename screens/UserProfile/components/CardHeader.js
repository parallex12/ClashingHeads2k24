import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ProfileCardstyles as _styles } from "../../../styles/UserProfile/main";
import { font } from "../../../styles/Global/main";
import CacheImage from "../../../globalComponents/CacheImage";
import { useNavigation } from "@react-navigation/native";

const CardHeader = (props) => {
  let { user } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let { profile_hash, following, followers, posts } = user;
  const navigation = useNavigation();

  const onFollowView = () => {
    navigation.navigate("Connections", { user });
  };

  return (
    <View style={styles.cardHeaderContainer}>
      <View style={styles.cardHeaderProfileWrapper}>
        <View style={styles.cardHeaderProfile}>
          <CacheImage
            source={{ uri: user?.profile_photo }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            hash={profile_hash}
          />
        </View>
        <View style={styles.cardHeaderProfileOnlineDot}></View>
      </View>
      <View style={styles.post_following_followers_cont}>
        <View style={styles.post_following_followers_Item}>
          <Text style={font(15, "#121212", "Bold", 3)}>
            {posts?.length || 0}
          </Text>
          <Text style={font(13, "#121212", "Regular", 3)}>Posts</Text>
        </View>
        <TouchableOpacity
          style={styles.post_following_followers_Item}
          onPress={onFollowView}
        >
          <Text style={font(15, "#121212", "Bold", 3)}>
            {followers?.length}
          </Text>
          <Text style={font(13, "#121212", "Regular", 3)}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.post_following_followers_Item}
          onPress={onFollowView}
        >
          <Text style={font(15, "#121212", "Bold", 3)}>
            {following?.length}
          </Text>
          <Text style={font(13, "#121212", "Regular", 3)}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardHeader;
