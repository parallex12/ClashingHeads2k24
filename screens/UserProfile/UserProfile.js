import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/UserProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useRef } from "react";

const UserProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(global_posts);
  const bottomFlagSheetRef = useRef();

  return (
    <View style={styles.container}>
      <StandardHeader title="Profile" backButton />
      <ScrollView>
        <View style={styles.content}>
          <ProfileCard />
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
      <BottomMenu active="Home" />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />

    </View>
  );
};

export default UserProfile;
