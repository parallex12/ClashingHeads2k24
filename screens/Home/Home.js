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
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig, } from "../../utils";
import { getFirestore } from "firebase/firestore";
import { connect, useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import { startLoading, stopLoading } from "../../state-management/features/screen_loader/loaderSlice";
import firebase from "firebase/compat/app";
import { selectAuthUser } from "../../state-management/features/auth";
import { isUserProfileConnected } from "../../middleware/firebase";
import { setUserDetails } from "../../state-management/features/auth/authSlice";

const Home = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useState([]);
  const bottomFlagSheetRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch()
  const user_details = useSelector(selectAuthUser)

  useEffect(() => {
    dispatch(startLoading());
    if (firebase.apps.length == 0) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
    }
    if (!user_details) {
      isUserProfileConnected(auth().currentUser?.uid)
        .then((res) => {
          dispatch(setUserDetails(JSON.stringify(res)))
          if (res?.goTo) {
            props?.navigation.navigate(res?.goTo);
          }
          dispatch(stopLoading());
        })
        .catch((e) => {
          if (e == 404) {
            props?.navigation.navigate("CommunityGuidelines");
            return;
          }
        });
    } else {
      dispatch(stopLoading());
    }
  }, []);


  // useEffect(() => {
  //   getHomePosts()
  //     .then((res) => {
  //       setLoading(false)
  //     })
  // }, [props?.user_db_details])


  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   getHomePosts()
  //     .then((res) => {
  //       setRefreshing(false)
  //     })
  // }, []);

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
        {/* <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={posts}
          ListEmptyComponent={<EmptyBox text="No posts available." />}
          renderItem={(({ item, index }) => {
            return (
              <PostCard
                divider
                desc_limit={1}
                data={item}
                key={index}
                onReportPress={() => bottomFlagSheetRef?.current?.present()}
                onProfilePress={() =>
                  props?.navigation?.navigate("UserProfile")
                }
              />
            );
          })}
          keyExtractor={(item) => item.id.toString()} // Assuming item.id is a unique identifier
        /> */}
      </View>

      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <BottomMenu />
    </View>
  );
};

export default Home

