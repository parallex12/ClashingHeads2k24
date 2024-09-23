import { useWindowDimensions } from "react-native";
import { PostsResultStyles as _styles } from "../../../styles/Search/main";
import { memo } from "react";
import { usePostsSearch } from "../../../Hooks/useSearch";
import FeedFlatlist from "../../../globalComponents/FeedFlatlist/FeedFlatlist";

const PostsResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  const postsQuery = usePostsSearch(searchQuery);

  return (
    <FeedFlatlist query={postsQuery} customStyles={{ paddingBottom: 10 }} />
  );
};

export default memo(PostsResult);
