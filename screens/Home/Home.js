import { Image, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Home/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { getPercent } from "../../middleware";
import PostActionsBottomSheet from "../../globalComponents/PostActionsBottomSheet/PostActionsBottomSheet";
import { Instagram } from "react-content-loader/native";
import useUserProfile from "../../Hooks/useUserProfile";
import useUserFeed from "../../Hooks/useUserFeed";
import FeedFlatlist from "./components/FeedFlatlist";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const bottomFlagSheetRef = useRef(null);
  const postActionsbottomSheetRef = useRef(null);
  const [postInteraction, setPostInteraction] = useState(null);
  const userProfile = useUserProfile();
  const userFeed = useUserFeed();
  const navigation = useNavigation();

  useEffect(() => {
    if (userProfile.isFetched && userProfile.data?.goTo) {
      navigation.navigate(userProfile.data.goTo)
    }
  }, [userProfile.isFetched, userProfile.data?.goTo]);
  
  const onPostActionsPress = () => {
    setPostInteraction(item);
    postActionsbottomSheetRef?.current?.present();
  };

  const onPostReport = () => {
    bottomFlagSheetRef?.current?.present();
  };

  return (
    <View style={styles.container}>
      <StandardHeader searchIcon profile logo />
      <View style={styles.header2Wrapper}>
        <Text style={font(21, "#111827", "Semibold")}>Clashing Heads</Text>
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
      {userFeed?.isLoading ? (
        new Array(2).fill().map((item, index) => {
          return <Instagram style={{ alignSelf: "center" }} key={index} />;
        })
      ) : (
        <FeedFlatlist
          userFeed={userFeed}
          onItemActionsPress={onPostActionsPress}
          onItemReportPress={onPostReport}
        />
      )}
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <PostActionsBottomSheet
        data={postInteraction}
        bottomSheetRef={postActionsbottomSheetRef}
        onRefresh={() => null}
      />
    </View>
  );
};

export default Home;
