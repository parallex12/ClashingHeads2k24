import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ProfileCardstyles as _styles } from "../../../styles/UserProfile/main";
import { font } from "../../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";
import { numberWithSuffix } from "../../../utils";
import ActivityStatus from "../../../globalComponents/ActivityStatus";

const CardHeader = (props) => {
  let { user } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  let { followers, posts, following, profile_photo, profile_hash } = user;

  const onFollowView = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Connections", params: { user } }],
    });
  };
  return (
    <View style={styles.cardHeaderContainer}>
      <View style={styles.cardHeaderProfileWrapper}>
        <View style={styles.cardHeaderProfile}>
          <ImageViewer
            source={{ uri: profile_photo }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            post_image_hash={profile_hash}
          />
        </View>
        <ActivityStatus user={user} />
      </View>
      <View style={styles.post_following_followers_cont}>
        <View style={styles.post_following_followers_Item}>
          <Text style={font(16, "#121212", "Bold", 3)}>
            {numberWithSuffix(posts)}
          </Text>
          <Text style={font(14, "#121212", "Regular", 3)}>Posts</Text>
        </View>
        <TouchableOpacity
          style={styles.post_following_followers_Item}
          onPress={onFollowView}
        >
          <Text style={font(16, "#121212", "Bold", 3)}>
            {numberWithSuffix(followers?.length)}
          </Text>
          <Text style={font(14, "#121212", "Regular", 3)}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.post_following_followers_Item}
          onPress={onFollowView}
        >
          <Text style={font(16, "#121212", "Bold", 3)}>
            {numberWithSuffix(following?.length)}
          </Text>
          <Text style={font(14, "#121212", "Regular", 3)}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardHeader;
