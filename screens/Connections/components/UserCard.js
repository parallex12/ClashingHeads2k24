import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { UserCardStyles as _styles } from "../../../styles/Connections/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";
import CacheImage from "../../../globalComponents/CacheImage";
import ActivityStatus from "../../../globalComponents/ActivityStatus";
import UserApi from "../../../ApisManager/UserApi";
import { useEffect, useState } from "react";

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
  const userapi = new UserApi();

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

  const onFollow = async () => {
    if (!current_user || !user) return;
    if (
      currentFollowButtonState == "Follow" ||
      currentFollowButtonState == "Follow back"
    ) {
      setIsCurrentUserFollower(current_user);
      await userapi.followUser(current_user?._id, _id);
      return;
    }

    if (currentFollowButtonState == "Following") {
      setIsCurrentUserFollower(null);
      await userapi.unfollowUser(current_user?._id, _id);
    }
  };
  console.log(current_user?._id,user)

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profile}>
        <CacheImage
          source={{ uri: user?.profile_photo }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          hash={user?.profile_hash}
        />
        <ActivityStatus user={user} />
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
