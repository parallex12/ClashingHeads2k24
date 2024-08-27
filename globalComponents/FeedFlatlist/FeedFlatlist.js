import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { feedFlatlistStyles as _styles } from "../../styles/Global/main";
import { Instagram } from "react-content-loader/native";
import PostCard from "../PostCard/PostCard";
import ChallengeCard from "../ChallengeCard/ChallengeCard";
import { useQueryClient } from "react-query";

const FeedPostCardRender = (props) => {
  const navigation = useNavigation();
  let { data, actions } = props;
  let { onReportPress, onActionsPress } = actions;
  return (
    <PostCard
      divider
      desc_limit={1}
      data={data}
      onPostClashesPress={() =>
        navigation?.navigate("ClashDetails", { ...data, openVoiceSheet: true })
      }
      onReportPress={onReportPress}
      onActionsPress={onActionsPress}
    />
  );
};

const FeedChallengeCardRender = ({ data }, onReportPress) => {
  const navigation = useNavigation();
  return (
    <ChallengeCard
      divider
      onPress={() => navigation?.navigate("ChallengeClash", { ...data })}
      onClashesPress={() => navigation?.navigate("ChallengeClash", { ...data })}
      onReportPress={onReportPress}
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
  let { query, itemActions } = props;
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
    <View style={styles.content}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        {...props}
        data={query?.data?.filter((e) => e != undefined)}
        renderItem={({ item, index }) => {
          if (item?.clashType == "challenge") {
            return (
              <FeedChallengeCardRender
                data={item}
                key={index}
                actions={itemActions}
              />
            );
          } else {
            return (
              <FeedPostCardRender
                data={item}
                key={index}
                actions={itemActions}
              />
            );
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
