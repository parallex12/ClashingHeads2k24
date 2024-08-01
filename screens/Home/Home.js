import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Home/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { font, fontTest } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig, sortPostsByCreatedAt } from "../../utils";
import { getFirestore } from "firebase/firestore";
import { connect, useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import firebase from "firebase/compat/app";
import { selectAuthUser } from "../../state-management/features/auth";
import {
  getFBAccessToken,
  getHomePosts,
  getPaginatedHomePosts,
  getRecommendedPosts,
  isUserProfileConnected,
} from "../../middleware/firebase";
import {
  fetchCurrentUserDetails,
  logout,
  setUserDetails,
} from "../../state-management/features/auth/authSlice";
import { selectPosts } from "../../state-management/features/posts";
import { getPercent, setAuthToken } from "../../middleware";
import "../../utils/firebaseInitialize";
import { useUserStatus } from "../../middleware/Hooks/useUserStatus";
import PostActionsBottomSheet from "../../globalComponents/PostActionsBottomSheet/PostActionsBottomSheet";
import {
  connectUserToDb,
  get_user_profile,
} from "../../state-management/apiCalls/auth";
import { get_all_posts_test } from "../../state-management/apiCalls/post";

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
  const [reachedEnd, setReachedEnd] = useState(false);
  const dispatch = useDispatch();
  const user = auth().currentUser;

  useEffect(() => {
    connectUserToDb(user?.phoneNumber)
      .then(async (res) => {
        let user_id = res?.user?._id || res?._id;
        let user_profile = await get_user_profile(user_id);
        dispatch(setUserDetails(user_profile));
        if (res?.goTo) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: res?.goTo }],
          });
        }
      })
      .catch((e) => {
        console.log(e);
        // dispatch(logout());
      });
  }, []);

  const loadPosts = async (type) => {
    try {
      const res = await get_all_posts_test();
      setCurrentPosts(res?.posts);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadPosts(null, "refresh");
  }, []);

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
        <Text style={font(18, "#111827", "Semibold")}>Clashing Heads</Text>
        <StandardButton
          title="Reply Clash"
          customStyles={styles.header2WrapperBtn}
          textStyles={font(12, "#FFFFFF", "Semibold")}
          onPress={() => props?.navigation.navigate("NewPost")}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={memoizedPosts}
          renderItem={({ item, index }) => {
            return (
              <PostCard
                divider
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
      />
    </View>
  );
};

export default Home;
