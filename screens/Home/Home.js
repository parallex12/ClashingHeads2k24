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
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(global_posts);

  return (
    <View style={styles.container}>
      <StandardHeader searchIcon profile logo />
      <View style={styles.header2Wrapper}>
        <Text style={font(15, "#111827", "Semibold")}>Clashing Heads</Text>
        <StandardButton
          title="Create New Post"
          customStyles={styles.header2WrapperBtn}
          textStyles={font(12, "#FFFFFF", "Semibold")}
        />
      </View>
      <ScrollView>
        <View style={styles.content}>
          {posts?.map((item, index) => {
            return <PostCard divider data={item} key={index} />;
          })}
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default Home;
