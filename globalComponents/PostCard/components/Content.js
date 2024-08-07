import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../WaveAudioPlayer";
import { memo, useEffect, useState } from "react";
import { download } from "react-native-compressor";
import CacheImage from "../../CacheImage";
import ImageViewer from "../../ImageViewer/ImageViewer";

const Content = memo((props) => {
  let {
    description,
    onAudioPlay,
    desc_limit,
    title,
    post_image,
    sticker,
    recording,
    post_image_hash,
  } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [downloadedAudio, setDownloadedAudio] = useState(null);

  const downloadCompressedAudio = async () => {
    const downloadFileUrl = await download(recording, (progress) => {});
    setDownloadedAudio(downloadFileUrl);
  };

  useEffect(() => {
    if (recording) {
      downloadCompressedAudio();
    }
  }, [recording]);

  const PostImage = ({ source, onPress }) => {
    return (
      <TouchableOpacity style={styles.postImageWrapper} activeOpacity={0.9}>
        {source?.uri ? (
          <CacheImage
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            hash={post_image_hash}
          />
        ) : (
          <Image
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container} activeOpacity={1}>
      {title && <Text style={styles.title}>{title}</Text>}
      {post_image && (
        <ImageViewer
          source={{ uri: post_image }}
          post_image_hash={post_image_hash}
        />
      )}
      {/* {post_image && <PostImage source={{ uri: post_image }} />} */}
      {sticker && <PostImage source={sticker?.img} />}
      {recording && (
        <WaveAudioPlayer
          afterAudioPlayed={onAudioPlay}
          source={downloadedAudio}
        />
      )}
      {sticker && (
        <WaveAudioPlayer
          afterAudioPlayed={onAudioPlay}
          localSource={sticker?.audio}
        />
      )}
      {description && (
        <Text numberOfLines={desc_limit} style={styles.smallText}>
          {description}
        </Text>
      )}
    </View>
  );
});

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(5, height),
      justifyContent: "space-around",
    },
    title: font(17, "#1C1C1C", "Medium", 15),
    postImageWrapper: {
      width: "100%",
      minHeight: getPercent(15, height),
      maxHeight: getPercent(25, height),
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
      marginBottom: getPercent(1, height),
    },
    smallText: font(15, "#111827", "Regular", 10),
    bgTouchable: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "red",
    },
  });

export default Content;
