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
import { useEffect, useRef, useState } from "react";
import {
  follow_user,
  unfollow_user,
} from "../../../state-management/apiCalls/userRelation";

const UserCard = (props) => {
  let { user, isDisplayedUserMe, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const current_user = useSelector(selectAuthUser);
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const [currentFollowButtonState, setCurrentFollowButtonState] = useState();
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState();
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState();
  let { followers, following, _id } = user;

  useEffect(() => {
    setIsCurrentUserFollower(followers?.includes(current_user?._id));
    setIsCurrentUserFollowing(following?.includes(current_user?._id));
  }, [following, followers]);

  useEffect(() => {
    setCurrentFollowButtonState(
      isCurrentUserFollower
        ? followButtonTypes[0]
        : isCurrentUserFollowing
        ? followButtonTypes[2]
        : followButtonTypes[1]
    );
  }, [isCurrentUserFollowing, isCurrentUserFollower]);

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
