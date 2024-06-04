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
import { global_posts, screen_loader, user_auth } from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useEffect, useRef } from "react";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(global_posts);
  const bottomFlagSheetRef = useRef(null);
  const userAuth = useRecoilValue(user_auth);
  const [loading, setLoading] = useRecoilState(screen_loader);

  useEffect(() => {    
    setLoading(true)
    if (userAuth?.uid) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      isUserProfileConnected(userAuth?.uid)
        .then((res) => {
          console.log(res);
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
    console.log(userAuth)
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
          onPress={() => setLoading(true)}
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
