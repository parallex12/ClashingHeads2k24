import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Home/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../state-management/features/auth/authSlice";
import { getPercent } from "../../middleware";
import PostActionsBottomSheet from "../../globalComponents/PostActionsBottomSheet/PostActionsBottomSheet";
import ChallengeCard from "../../globalComponents/ChallengeCard/ChallengeCard";
import UserApi from "../../ApisManager/UserApi";
import FeedApi from "../../ApisManager/FeedApi";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const bottomFlagSheetRef = useRef(null);
  const postActionsbottomSheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [postInteraction, setPostInteraction] = useState(null);
  const [lastVisiblePost, setLastVisiblePost] = useState(null);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const dispatch = useDispatch();
  const userapi = new UserApi();
  const feedApi = new FeedApi();

  useEffect(() => {
    (async () => {
      const result = await userapi.getUserProfile();
      dispatch(setUserDetails(result?.user || {}));
      loadPosts();
      if (result?.goTo) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: result?.goTo }],
        });
      }
    })();
  }, []);

  const loadPosts = async () => {
    try {
      const feedResult = await feedApi.getUserFeed(page);
      setCurrentPosts(feedResult?.feed);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  const memoizedPosts = useMemo(() => currentPosts, [currentPosts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts(lastVisiblePost, "refresh");
  };

  const onLoadMore = () => {
    loadPosts(lastVisiblePost, "loadMore");
  };

  const renderFooter = () => {
    if (loadingMore && !reachedEnd) {
      return (
        <View style={styles.loadingIndicatorContainer}>
          <ActivityIndicator size="small" color="#222" />
        </View>
      );
    } else {
      return null;
    }
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
      <View style={styles.content}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={memoizedPosts}
          renderItem={({ item, index }) => {
            if (item?.clashType == "challenge") {
              return (
                <ChallengeCard
                  divider
                  onPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onClashesPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onReportPress={() => bottomFlagSheetRef.current.present()}
                  key={index}
                  data={item}
                />
              );
            }
            return (
              <PostCard
                divider={index != 0}
                desc_limit={1}
                data={item}
                key={index}
                onPostClashesPress={() =>
                  props?.navigation?.navigate("ClashDetails", { ...item })
                }
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
                onActionsPress={() => {
                  setPostInteraction(item);
                  postActionsbottomSheetRef?.current?.present();
                }}
              />
            );
          }}
          keyExtractor={(item) => item?._id?.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.6}
          removeClippedSubviews
          windowSize={10}
          getItemLayout={(data, index) => ({
            length: getPercent(15, height), // Replace ITEM_HEIGHT with the actual height of your items
            offset: getPercent(15, height) * index,
            index,
          })}
        />
      </View>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <PostActionsBottomSheet
        data={postInteraction}
        bottomSheetRef={postActionsbottomSheetRef}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default Home;
