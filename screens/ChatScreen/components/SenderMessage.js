import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SenderMessagestyles as _styles } from "../../../styles/Global/main";
import {
  formatTime,
  getPercent,
  messageMenuOptions,
} from "../../../middleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";
import { memo } from "react";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import ContextMenu from "react-native-context-menu-view";
import ReplyCard from "./ReplyCard";

const SenderMessage = (props) => {
  let {
    data,
    flatListRef,
    replyMsgContent,
    onMessageItemMenuSelect,
    replyIndex,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let time = formatTime(data?.createdAt);
  let media = data?.media;

  let expandWidth = { width: getPercent(65, width) };

  let msgBg = {
    backgroundColor: "rgba(0,0,0,0.31)",
  };

  const onContextMenuSelect = (e) => {
    const index = e.nativeEvent.index;
    onMessageItemMenuSelect(messageMenuOptions[index], data?._id);
  };

  const onReplyPress = () => {
    try {
      if (replyIndex !== -1) {
        flatListRef.current.scrollToIndex({
          index: replyIndex,
          animated: true,
        });
      }
    } catch (e) {
      console.log(replyIndex);
      console.log(e.message);
    }
  };

  return (
    <ContextMenu
      actions={messageMenuOptions}
      onPress={onContextMenuSelect}
      previewBackgroundColor="rgba(0,0,0,0)"
    >
      <View style={styles.mainCont}>
        <View
          style={[
            styles.container,
            data?.message?.length > 0 || media?.image ? null : msgBg,

            media?.image || media?.audio ? expandWidth : null,
          ]}
        >
          {media?.reply && (
            <ReplyCard onPress={onReplyPress} content={replyMsgContent} />
          )}
          {media?.image && (
            <View style={styles.mediaWrapper}>
              <ImageViewer
                source={{ uri: media?.image }}
                style={styles.mediaImg}
              />
            </View>
          )}

          {media?.audio && <WaveAudioPlayer source={media?.audio} />}
          {data?.message?.length > 0 && (
            <Text style={styles.text}>{data?.message}</Text>
          )}
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.time}>{time}</Text>
          {data?.status == "sending" ? (
            <MaterialIcons name="timelapse" size={RFValue(12)} color="grey" />
          ) : data?.status == "delivered" ? (
            <Ionicons
              name="checkmark-done"
              size={RFValue(12)}
              color={data?.read ? "blue" : "grey"}
            />
          ) : (
            <MaterialIcons name="error" size={RFValue(12)} color="#DB2727" />
          )}
        </View>
      </View>
    </ContextMenu>
  );
};

export default memo(SenderMessage);
