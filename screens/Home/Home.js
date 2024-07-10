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
import { font } from "../../styles/Global/main";
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
import axios from "axios";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const posts = useSelector(selectPosts);
  const bottomFlagSheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [lastVisiblePost, setLastVisiblePost] = useState(null);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  const dispatch = useDispatch();
  const user_details = useSelector(selectAuthUser);
  const user = auth().currentUser;

  useEffect(() => {
    setContentLoading(true);
    if (firebase.apps.length === 0) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
    }
    dispatch(fetchCurrentUserDetails(auth().currentUser?.uid));
    isUserProfileConnected(auth().currentUser?.uid)
      .then((res) => {
        dispatch(setUserDetails(res?.user));
        if (res?.goTo) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: res?.goTo }],
          });
        }
      })
      .catch((e) => {
        if (e === 404) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: "CommunityGuidelines" }],
          });
          return;
        }
        dispatch(logout());
      });
  }, []);

  const loadPosts = async (refresh) => {
    try {
      // const res = await getRecommendedPosts(num);
      // if (res?.status == 200) {
      //   console.log("Posts", res);
      //   dispatch(setPosts(res?.data));
      // }
      const res = await getPaginatedHomePosts(lastVisiblePost);
      const { newposts, lastVisiblePost: newLastVisiblePost } = res;
      setLastVisiblePost(newLastVisiblePost);
      // dispatch(setPosts(updatedPosts));
      if (refresh) {
        setCurrentPosts(newposts);
      } else {
        setCurrentPosts((prev) => {
          return [...prev, ...newposts];
        });
      }

      setContentLoading(false);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setContentLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(true);
  }, []);

  const onLoadMore = () => {
    loadPosts();
    console.log("loadingMmore");
  };

  const memoizedPosts = useMemo(() => currentPosts, [currentPosts]);

  const sortedPosts = useMemo(() => {
    // Sort posts by createdAt date
    return sortPostsByCreatedAt(memoizedPosts);
  }, [memoizedPosts]);

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
        <Text style={font(15, "#111827", "Semibold")}>Clashing Heads</Text>
        <StandardButton
          title="Create New Post"
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
              />
            );
          }}
          keyExtractor={(item) => item?.id?.toString()}
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
    </View>
  );
};

export default Home;
