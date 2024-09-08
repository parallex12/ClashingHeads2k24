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
import ImageViewer from "../../ImageViewer/ImageViewer";
import FastImage from "react-native-fast-image";
import { rms, rs } from "../../../utils/responsiveSizing";
import { ScaledSheet } from "react-native-size-matters";

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
        <FastImage
          source={{ ...source, priority: FastImage.priority.normal }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} activeOpacity={1}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && (
        <Text numberOfLines={desc_limit} style={styles.smallText}>
          {description}
        </Text>
      )}
      {post_image && (
        <ImageViewer
          source={{ uri: post_image }}
          post_image_hash={post_image_hash}
        />
      )}
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
    </View>
  );
});

const _styles = ({ width, height }) =>
  ScaledSheet.create({
    container: {
      width: "100%",
      minHeight: getPercent(5, height),
      justifyContent: "space-around",
      marginVertical: rs(10),
    },
    title: {
      fontSize: rms(16),
      color: "#1C1C1C",
      fontFamily: "Medium",
    },
    postImageWrapper: {
      width: "100%",
      minHeight: getPercent(15, height),
      maxHeight: getPercent(25, height),
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
    },
    smallText: {
      fontSize: rms(12),
      color: "#111827",
      fontFamily: "Regular",
      marginVertical: rs(10),

    },
    bgTouchable: {
      width: "100%",
      height: "100%",
      position: "absolute",
      backgroundColor: "red",
    },
  });

export default Content;
