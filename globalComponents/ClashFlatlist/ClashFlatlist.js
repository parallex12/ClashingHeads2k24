import { useContext, useState } from "react";
import { RefreshControl, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native";
import { ClashFlatlistStyles as _styles } from "../../styles/Global/main";
import { Instagram } from "react-content-loader/native";
import ClashCard from "../UniversalClashCard/ClashCard";
import FlagReportSheetContext from "../BottomSheet/FlagReportSheetProvider";
import PostActionsSheetContext from "../BottomSheet/PostActionsSheetProvider";

const FeedClashCardRender = (props) => {
  let { data, actions } = props;
  let { onPostClashesPress, onActionsPress } = actions;
  const { showBottomSheet } = useContext(FlagReportSheetContext);
  const { showBottomSheet: showActionSheet } = useContext(
    PostActionsSheetContext
  );
  return (
    <ClashCard
      postDateAndViews
      hrLine
      desc_limit={1}
      data={data}
      onPostClashesPress={() => onPostClashesPress(data)}
      onReportPress={() => showBottomSheet(data)}
      onActionsPress={onActionsPress}
    />
  );
};

const RenderFooter = (props) => {
  let { hasNextPage, isFetchingNextPage, isLoading, isFetching } = props;
  if (hasNextPage || isFetchingNextPage || isLoading || isFetching) {
    let { width, height } = useWindowDimensions();
    return <Instagram />;
  }
};

const ClashFlatlist = (props) => {
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
          return (
            <FeedClashCardRender
              data={item}
              key={index}
              actions={itemActions}
            />
          );
        }}
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

export default ClashFlatlist;
