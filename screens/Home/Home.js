import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Home/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";

const Home = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [posts, setPosts] = useRecoilState(global_posts);

  return (
    <View style={styles.container}>
      <StandardHeader searchIcon profile logo />
      <ScrollView>
        <View style={styles.content}>
          {posts?.map((item, index) => {
            return <PostCard divider  data={item} key={index} />;
          })}
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default Home;
