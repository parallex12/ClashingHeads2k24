import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/MyProfile/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import ProfileCard from "./components/ProfileCard";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRef, useState } from "react";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { getPercent } from "../../middleware";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";

const MyProfile = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useState([]);
  const user_details = useSelector(selectAuthUser);
  let { profile_photo, about_voice,realName } = user_details;
  const [currentProfile, setCurrentProfile] = useState({uri:profile_photo});

  const bottomFlagSheetRef = useRef();

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Profile"
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          <ProfileCard
            currentProfile={currentProfile}
            setCurrentProfile={setCurrentProfile}
          />
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
      <BottomMenu active="menu" />
      <FlagReportBottomSheet bottomSheetRef={bottomFlagSheetRef} />
    </View>
  );
};

export default MyProfile;
