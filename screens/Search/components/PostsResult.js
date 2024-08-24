import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { PostsResultStyles as _styles } from "../../../styles/Search/main";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import PostCard from "../../../globalComponents/PostCard/PostCard";
import { memo } from "react";
import { usePostsSearch } from "../../../Hooks/useSearch";

const PostsResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const postsQuery = usePostsSearch(searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Posts</Text>
      </View>
      <ScrollView>
        <View style={styles.content}>
          {postsQuery?.data?.map((item, index) => {
            return <PostCard divider data={item} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(PostsResult);
