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

const ProfileCard = (props) => {
  let { user } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const CardHeader = ({user}) => {
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
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>
              {user?.followers || 0}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Followers</Text>
          </View>
          <View style={styles.post_following_followers_Item}>
            <Text style={font(15, "#121212", "Bold", 3)}>
              {user?.following || 0}
            </Text>
            <Text style={font(13, "#121212", "Regular", 3)}>Following</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CardHeader user={user} />
      <View style={styles.userInfoWrapper}>
        <View style={styles.usernameWrapper}>
          <Text style={font(16, "#111827", "Medium", 2)}>{user?.realName}</Text>
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
        <Text style={font(12, "#6B7280", "Regular", 2)}>{user?.politics}</Text>
        <Text style={font(12, "#121212", "Regular", 10)}>
          {user?.bio ||
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`}
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
        <StandardButton title="Follow" customStyles={styles.followButton} />
        <StandardButton
          title="Message"
          customStyles={styles.messageButton}
          textStyles={{ color: "#121212" }}
        />
      </View>
    </View>
  );
};

export default ProfileCard;
