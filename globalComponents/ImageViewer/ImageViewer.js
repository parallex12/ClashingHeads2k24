import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { ImageViewerStyles } from "../../styles/Global/main";
import CacheImage from "../CacheImage";
import { useState } from "react";

const ImageViewer = (props) => {
  let { source, post_image_hash, isLocal } = props;
  let { width, height } = useWindowDimensions();
  let styles = ImageViewerStyles({ width, height });
  const [imageLoad, setImageLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.postImageWrapper}
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        {source?.uri ? (
          <CacheImage
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            hash={post_image_hash}
            isLocal={isLocal}
          />
        ) : (
          <Image
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.fullScreenBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            {source?.uri ? (
              <CacheImage
                source={source}
                resizeMode="contain"
                style={styles.fullScreenImage}
                hash={post_image_hash}
              />
            ) : (
              <Image
                source={source}
                resizeMode="contain"
                style={styles.fullScreenImage}
                onLoad={() => setImageLoad(false)}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ImageViewer;
