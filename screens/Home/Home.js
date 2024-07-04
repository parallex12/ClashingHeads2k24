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
import {
  startLoading,
  stopLoading,
} from "../../state-management/features/screen_loader/loaderSlice";
import firebase from "firebase/compat/app";
import { selectAuthUser } from "../../state-management/features/auth";
import {
  getFBAccessToken,
  getHomePosts,
  getRecommendedPosts,
  isUserProfileConnected,
} from "../../middleware/firebase";
import {
  fetchCurrentUserDetails,
  logout,
  setUserDetails,
} from "../../state-management/features/auth/authSlice";
import { selectPosts } from "../../state-management/features/posts";
import { setPosts } from "../../state-management/features/posts/postSlice";
import EmptyBox from "../../globalComponents/EmptyBox";
import ContentLoader, {
  Facebook,
  Instagram,
} from "react-content-loader/native";
import { setAuthToken } from "../../middleware";
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
  const [currentPage, setCurrentPage] = useState(1);
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
        setContentLoading(false);
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
        setContentLoading(false);
      });
  }, []);

  const loadPosts = async () => {
    // const res = await getRecommendedPosts();
    // if (res?.status == 200) {
    //   console.log("Posts",res?.data?.length)
    //   dispatch(setPosts(res?.data));
    // }
    if (loadingMore || reachedEnd) return;
    setLoadingMore(true);
    try {
      const res = await getHomePosts(currentPage);
      if (res?.length < 10) {
        setReachedEnd(true); // No more posts to load
      }
      dispatch(setPosts(res));
      setContentLoading(false);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
      setContentLoading(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(1);
  }, []);

  const onEndReached = useCallback(() => {
    if (!loadingMore && !reachedEnd) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [loadingMore, reachedEnd]);

  const memoizedPosts = useMemo(() => posts?.data, [posts]);

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
        {contentLoading || refreshing ? (
          [1, 2, 3].map((item, index) => {
            return <Instagram key={index} style={{ alignSelf: "center" }} />;
          })
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={sortedPosts}
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
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default Home;
