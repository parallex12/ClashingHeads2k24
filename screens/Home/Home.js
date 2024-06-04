import {
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
import { useRecoilState, useRecoilValue } from "recoil";
import {
  firebase_expo_app_initialize,
  global_posts,
  home_posts,
  screen_loader,
  user_auth,
  user_db_details,
} from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { getHomePosts, isUserProfileConnected } from "../../middleware/firebase";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../utils";
import { getFirestore } from "firebase/firestore";
import EmptyBox from "../../globalComponents/EmptyBox";

const Home = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(home_posts);
  const bottomFlagSheetRef = useRef(null);
  const userAuth = useRecoilValue(user_auth);
  const [loading, setLoading] = useRecoilState(screen_loader);
  const [user_details, setUser_details] = useRecoilState(user_db_details);
  const [firebase_expo_app, setfirebase_expo_app] = useRecoilState(firebase_expo_app_initialize);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!firebase_expo_app) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      setfirebase_expo_app(app)
    }
    if (!user_db_details) {
      isUserProfileConnected(userAuth?.uid, setUser_details)
        .then((res) => {
          if (res?.goTo) {
            props?.navigation.navigate(res?.goTo);
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          if (e == 404) {
            props?.navigation.navigate("CommunityGuidelines");
            return;
          }
        });
    }
    if (!posts) {
      getHomePosts()
        .then((res) => {
          console.log(res)
          setPosts(res)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [userAuth]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getHomePosts()
      .then((res) => {
        setPosts(res)
        setRefreshing(false)
      })
  }, []);

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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        ListEmptyComponent={<EmptyBox text="No posts available." />}
        renderItem={(({item, index}) => {
          return (
            <PostCard
              divider
              data={item}
              key={index}
              onReportPress={() => bottomFlagSheetRef?.current?.present()}
              onProfilePress={() =>
                props?.navigation?.navigate("UserProfile")
              }
            />
          );
        })}
        keyExtractor={item => item?.id}
      />
      {/* <ScrollView>
        <View style={styles.content}>
          {posts?.map((item, index) => {
            return (
              <PostCard
                divider
                data={item}
                key={index}
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
                onProfilePress={() =>
                  props?.navigation?.navigate("UserProfile")
                }
              />
            );
          })}
        </View>
      </ScrollView> */}

      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <BottomMenu />
    </View>
  );
};

export default Home;
