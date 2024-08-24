import {
  RefreshControl,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/UserProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useRef } from "react";
import { getPercent } from "../../middleware";
import useOtherUserProfile from "../../Hooks/useOtherUserProfile";
import useUsersPosts from "../../Hooks/useUsersPosts";
import FeedFlatlist from "../../globalComponents/FeedFlatlist/FeedFlatlist";
import { Instagram } from "react-content-loader/native";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = props?.route?.params?.user;
  const bottomFlagSheetRef = useRef();
  const userProfile = useOtherUserProfile(user?._id);
  const usersPosts = useUsersPosts(user?._id);

  const onPostActionsPress = () => {
    setPostInteraction(item);
    postActionsbottomSheetRef?.current?.present();
  };

  const onPostReport = () => {
    bottomFlagSheetRef?.current?.present();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        title={`@${userProfile?.data?.user?.username}`}
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <FeedFlatlist
        ListHeaderComponent={
          !userProfile?.isLoading ? (
            <ProfileCard user={userProfile?.data?.user} query={userProfile} />
          ) : (
            <Instagram />
          )
        }
        query={usersPosts}
        onItemActionsPress={onPostActionsPress}
        onItemReportPress={onPostReport}
      />

      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default UserProfile;
