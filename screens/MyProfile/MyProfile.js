import { ScrollView, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import ProfileCard from "./components/ProfileCard";
import { useRef } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import useUserProfile from "../../Hooks/useUserProfile";
import useUsersPosts from "../../Hooks/useUsersPosts";
import FeedFlatlist from "../../globalComponents/FeedFlatlist/FeedFlatlist";
import { Instagram } from "react-content-loader/native";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const bottomFlagSheetRef = useRef();
  const userProfile = useUserProfile();
  const userId = userProfile?.data?.user?._id;
  const userPosts = useUsersPosts(userId);

  const onPostActionsPress = () => {
    postActionsbottomSheetRef?.current?.present();
  };

  const onPostReport = () => {
    bottomFlagSheetRef?.current?.present();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />

      <FeedFlatlist
        ListHeaderComponent={
          !userProfile?.isLoading ? (
            <ProfileCard user_details={userProfile?.data?.user} />
          ) : (
            <Instagram />
          )
        }
        query={userPosts}
        onItemActionsPress={onPostActionsPress}
        onItemReportPress={onPostReport}
      />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
