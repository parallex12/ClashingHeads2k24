import { useEffect, useRef, useState } from "react";
import { RefreshControl, useWindowDimensions, View } from "react-native";
import { FlatList } from "react-native";
import { ClashFlatlistStyles as _styles } from "../../styles/Global/main";
import RecieverMessage from "../../screens/ChatScreen/components/RecieverMessage";
import SenderMessage from "../../screens/ChatScreen/components/SenderMessage";

const Sender = (props) => {
  return <SenderMessage {...props} />;
};

const Reciever = (props) => {
  return <RecieverMessage {...props} />;
};

const renderItem = (props) => {
  let { item, index, currentUserId, onMenuSelect, combinedArr, flatListRef } =
    props;
  let senderId = item?.sender?._id || item?.sender;
  const replyIndex = combinedArr?.findIndex(
    (e) => e?._id == item?.media?.reply
  );
  return senderId == currentUserId ? (
    <Sender
      data={item}
      flatListRef={flatListRef}
      onMessageItemMenuSelect={onMenuSelect}
      replyIndex={replyIndex}
      replyMsgContent={combinedArr
        .flat()
        ?.find((e) => e?._id == item?.media?.reply)}
    />
  ) : (
    <Reciever
      data={item}
      flatListRef={flatListRef}
      onMessageItemMenuSelect={onMenuSelect}
      replyIndex={replyIndex}
      replyMsgContent={combinedArr
        .flat()
        ?.find((e) => e?._id == item?.media?.reply)}
    />
  );
};

const MessagesFlatlist = (props) => {
  let { query, data, currentUserId, onMenuSelect } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let flatListRef = useRef();

  let combinedArr = [data, query?.data?.filter((e) => e != undefined)].flat();

  const onLoadMore = () => {
    let { hasNextPage, isFetchingNextPage } = query;
    if (hasNextPage && !isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 1 });
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        onLayout={scrollToEnd}
        ref={flatListRef}
        {...props}
        data={combinedArr}
        renderItem={({ item, index }) =>
          renderItem({
            item,
            index,
            currentUserId,
            onMenuSelect,
            combinedArr,
            flatListRef,
          })
        }
        keyExtractor={(item, index) => item?._id}
        onEndReached={onLoadMore}
        onEndReachedThreshold={1}
        initialNumToRender={10} // Render only a few items initially for performance
        maxToRenderPerBatch={10} // Batch rendering to avoid performance hit
        contentContainerStyle={styles.listCont}
        inverted
      />
    </View>
  );
};

export default MessagesFlatlist;
