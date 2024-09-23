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
import CacheImage from "../../../globalComponents/CacheImage";
import ActivityStatus from "../../../globalComponents/ActivityStatus";
import UserApi from "../../../ApisManager/UserApi";
import { useEffect, useState } from "react";
import useUserProfile from "../../../Hooks/useUserProfile";
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";

const UserCard = (props) => {
  let { user, isDisplayedUserMe, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const followButtonTypes = ["Following", "Follow", "Follow back"];
  const [currentFollowButtonState, setCurrentFollowButtonState] = useState();
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState();
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState();
  let { followers, following, _id } = user;
  const userapi = new UserApi();

  useEffect(() => {
    setIsCurrentUserFollower(followers?.includes(currentUser?._id));
    setIsCurrentUserFollowing(following?.includes(currentUser?._id));
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
    if (!currentUser || !user) return;
    if (
      currentFollowButtonState == "Follow" ||
      currentFollowButtonState == "Follow back"
    ) {
      setIsCurrentUserFollower(currentUser);
      await userapi.followUser(currentUser?._id, _id);
      return;
    }

    if (currentFollowButtonState == "Following") {
      setIsCurrentUserFollower(null);
      await userapi.unfollowUser(currentUser?._id, _id);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profile}>
        <ImageViewer
          source={{ uri: user?.profile_photo }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
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
