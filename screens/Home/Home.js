import {
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
  global_posts,
  screen_loader,
  user_auth,
  user_db_details,
} from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useRef } from "react";
import { isUserProfileConnected } from "../../middleware/firebase";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../utils";
import { getFirestore } from "firebase/firestore";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(global_posts);
  const bottomFlagSheetRef = useRef(null);
  const  userAuth= useRecoilValue(user_auth);
  const [loading, setLoading] = useRecoilState(screen_loader);
  const [user_details, setUser_details] = useRecoilState(user_db_details);

  useEffect(() => {
    if (user_details) return;
    setLoading(true);
    if (userAuth?.uid) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
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
    } else {
      setLoading(false);
    }
  }, [userAuth]);

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
      <ScrollView>
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
      </ScrollView>

      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
      <BottomMenu />
    </View>
  );
};

export default Home;
