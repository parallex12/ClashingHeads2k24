import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { PostsResultStyles as _styles } from "../../../styles/Search/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import PostCard from "../../../globalComponents/PostCard/PostCard";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../state-management/features/posts";
import { sortPostsByCreatedAt } from "../../../utils";

const PostsResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const posts = useSelector(selectPosts);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Posts</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {sortPostsByCreatedAt(posts?.data)?.map((item, index) => {
            return <PostCard divider data={item} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostsResult;
