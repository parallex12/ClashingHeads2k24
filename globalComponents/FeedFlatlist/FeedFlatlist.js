import { useContext, useState } from "react";
import { RefreshControl, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { feedFlatlistStyles as _styles } from "../../styles/Global/main";
import { Instagram } from "react-content-loader/native";
import PostCard from "../PostCard/PostCard";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

const FeedPostCardRender = (props) => {
  const navigation = useNavigation();
  let { data } = props;

  return (
    <PostCard
      divider
      desc_limit={5}
      data={data}
      onPostClashesPress={() =>
        navigation?.navigate("ClashDetails", { ...data, openVoiceSheet: true })
      }
    />
  );
};

const FeedChallengeCardRender = ({ data }, onReportPress) => {
  const navigation = useNavigation();
  return (
    <ChallengeCard
      divider
      desc_limit={5}
      onPress={() => navigation?.navigate("ChallengeClash", { ...data })}
      onClashesPress={() => navigation?.navigate("ChallengeClash", { ...data })}
      data={data}
    />
  );
};

const RenderFooter = (props) => {
  let { hasNextPage, isFetchingNextPage, isLoading, isFetching } = props;
  if (hasNextPage || isFetchingNextPage || isLoading || isFetching) {
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
    return <Instagram />;
  }
};

const FeedFlatlist = (props) => {
  let { query, customStyles } = props;
  const [refreshing, setRefreshing] = useState(false);
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const onRefresh = async () => {
    setRefreshing(true);
    await query
      .refetch({ refetchPage: 0 })
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = () => {
    let { hasNextPage, isFetchingNextPage } = query;
    if (hasNextPage && !isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return (
    <View style={[styles.content, { ...customStyles }]}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        {...props}
        data={query?.data?.filter((e) => e != undefined)}
        renderItem={({ item, index }) => {
          if (item?.clashType == "challenge") {
            return <FeedChallengeCardRender data={item} key={index} />;
          } else {
            return <FeedPostCardRender data={item} key={index} />;
          }
        }}
        keyExtractor={(item, index) => item?._id + item?.updatedAt}
        ListFooterComponent={<RenderFooter {...query} />}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.8}
        initialNumToRender={3} // Render only a few items initially for performance
        maxToRenderPerBatch={5} // Batch rendering to avoid performance hit
        windowSize={5} // Adjust window size to keep fewer items in memory
        contentContainerStyle={styles.listCont}
      />
    </View>
  );
};

export default FeedFlatlist;
