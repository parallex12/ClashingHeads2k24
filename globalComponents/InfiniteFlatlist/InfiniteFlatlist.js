import { useState } from "react";
import { RefreshControl, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native";
import { InfiniteFlatlistStyles as _styles } from "../../styles/Global/main";
import { Instagram } from "react-content-loader/native";

const RenderFooter = (props) => {
  let { hasNextPage, isFetchingNextPage, isLoading, isFetching } = props;
  if (isFetchingNextPage || isLoading || isFetching) {
    return <Instagram />;
  }
};

const InfiniteFlatlist = (props) => {
  let { data, query, renderItem } = props;
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

  let arr = data || query?.data?.filter((e) => e != undefined);

  return (
    <View style={styles.content}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        {...props}
        data={arr}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?._id + item?.updatedAt || index.toString()
        }
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

export default InfiniteFlatlist;
