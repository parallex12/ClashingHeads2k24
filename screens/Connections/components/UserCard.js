import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { UserCardStyles as _styles } from "../../../styles/Connections/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import { update_user_details } from "../../../middleware/firebase";
import { setUserDetails } from "../../../state-management/features/auth/authSlice";

const UserCard = (props) => {
  let { user, isDisplayedUserMe,onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const current_user = useSelector(selectAuthUser);
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const currentUserfollowing = { ...current_user?.following } || {};
  const currentOtherUserfollowers = { ...user?.following } || {};
  const hasCurrentUserFollowed = currentUserfollowing[user?.id];
  const hasOpponentUserFollowed = currentOtherUserfollowers[current_user?.id];
  const dispatch = useDispatch();
  let currentFollowButtonState = hasCurrentUserFollowed
    ? followButtonTypes[0]
    : hasOpponentUserFollowed
    ? followButtonTypes[2]
    : followButtonTypes[1];

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

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profile}>
        <Image
          source={{ uri: user?.profile_photo }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={font(14, "#111827", "Medium")}>{user?.realName}</Text>
        <Text style={font(12, "#9CA3AF", "Regular", 5)}>@{user?.username}</Text>
      </View>
      {!isDisplayedUserMe && (
        <StandardButton
          title={currentFollowButtonState}
          customStyles={{
            paddingHorizontal: getPercent(4, width),
            height: getPercent(4.5, height),
          }}
          onPress={onFollow}
        />
      )}
    </TouchableOpacity>
  );
};

export default UserCard;
