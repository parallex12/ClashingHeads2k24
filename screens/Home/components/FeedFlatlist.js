import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList } from "react-native";
import PostCard from "../../../globalComponents/PostCard/PostCard";
import ChallengeCard from "../../../globalComponents/ChallengeCard/ChallengeCard";
import { useNavigation } from "@react-navigation/native";
import { styles as _styles } from "../../../styles/Home/main";

const FeedPostCardRender = (item, onReportPress, onActionsPress) => {
  const navigation = useNavigation();
  return (
    <PostCard
      divider
      desc_limit={1}
      data={item?.data}
      onPostClashesPress={() =>
        navigation?.navigate("ClashDetails", { ...item })
      }
      onReportPress={onReportPress}
      onActionsPress={onActionsPress}
    />
  );
};

const FeedChallengeCardRender = (item, onReportPress) => {
  const navigation = useNavigation();
  return (
    <ChallengeCard
      divider
      onPress={() => navigation?.navigate("ChallengeClash", { ...item })}
      onClashesPress={() => navigation?.navigate("ChallengeClash", { ...item })}
      onReportPress={onReportPress}
      data={item?.data}
    />
  );
};

const RenderFooter = (props) => {
  let { hasNextPage, isFetchingNextPage } = props;
  if (hasNextPage && isFetchingNextPage) {
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });

    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size="small" color="#222" />
      </View>
    );
  }
};

const FeedFlatlist = (props) => {
  let { userFeed, onItemActionsPress, onItemReportPress } = props;
  const [refreshing, setRefreshing] = useState(false);
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const onRefresh = async () => {
    setRefreshing(true);
    await userFeed
      .refetch()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = () => {
    let { hasNextPage, isFetchingNextPage } = userFeed;
    if (hasNextPage && !isFetchingNextPage) {
      userFeed.fetchNextPage();
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={userFeed?.data}
        renderItem={({ item, index }) => {
          if (item?.clashType == "challenge") {
            return (
              <FeedChallengeCardRender
                data={item}
                key={index}
                onReportPress={onItemReportPress}
              />
            );
          } else {
            return (
              <FeedPostCardRender
                data={item}
                key={index}
                onActionsPress={onItemActionsPress}
                onReportPress={onItemReportPress}
              />
            );
          }
        }}
        keyExtractor={(item) => item?._id + item?.updatedAt}
        ListFooterComponent={
          <RenderFooter
            hasNextPage={userFeed?.hasNextPage}
            isFetchingNextPage={userFeed?.isFetchingNextPage}
          />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default FeedFlatlist;
