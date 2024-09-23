import { Image, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Home/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { useEffect } from "react";
import { getPercent } from "../../middleware";
import useUserProfile from "../../Hooks/useUserProfile";
import { useNavigation } from "@react-navigation/native";
import FeedFlatlist from "../../globalComponents/FeedFlatlist/FeedFlatlist";
import { useUserFeed } from "../../Hooks/useUserFeed";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";
import { PostActionsSheetProvider } from "../../globalComponents/BottomSheet/PostActionsSheetProvider";
import FullScreenLoader from "../../globalComponents/FullScreenLoader/FullScreenLoader";
import checkInternetConnection from "../../middleware/internetChecker";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const userProfile = useUserProfile();
  const userFeed = useUserFeed();
  const navigation = useNavigation();

  useEffect(() => {
    if (userProfile.isFetched && userProfile.data?.goTo) {
      navigation.navigate(userProfile.data.goTo);
    }
  }, [userProfile.isFetched, userProfile.data?.goTo]);

  if (userProfile?.isFetching) {
    return <FullScreenLoader />;
  }


  return (
    <FlagReportSheetProvider>
      <PostActionsSheetProvider onRefresh={() => userFeed.refetch()}>
        <View style={styles.container}>
          <StandardHeader searchIcon profile logo />
          <View style={styles.header2Wrapper}>
            <Text style={font(16, "#111827", "Semibold")}>Clashing Heads</Text>
            <StandardButton
              customStyles={styles.header2WrapperBtn}
              onPress={() => props?.navigation.navigate("Notifications")}
              rightIcon={
                <Image
                  source={require("../../assets/icons/notificationWhite.png")}
                  resizeMode="contain"
                  style={{
                    width: "100%",
                    height: getPercent(3, height),
                  }}
                />
              }
            />
          </View>
          <FeedFlatlist query={userFeed} />
        </View>
      </PostActionsSheetProvider>
    </FlagReportSheetProvider>
  );
};

export default Home;
