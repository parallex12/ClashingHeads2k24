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
import { memo } from "react";
import { selectSearched } from "../../../state-management/features/searchedUsers";
import { Instagram } from "react-content-loader/native";

const PostsResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { posts, loading } = useSelector(selectSearched);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Posts</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {loading ? (
            <Instagram />
          ) : (
            posts?.map((item, index) => {
              if (index > 10) return;
              return <PostCard divider data={item} key={index} />;
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(PostsResult);
