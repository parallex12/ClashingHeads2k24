import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Modal,
  StyleSheet
} from "react-native";
import { ImageViewerStyles } from "../../styles/Global/main";
import CacheImage from "../CacheImage";
import { useState } from "react";
import { Blurhash } from "react-native-blurhash";

const ImageViewer = (props) => {
  let { source, post_image_hash } = props;
  let { width, height } = useWindowDimensions();
  let styles = ImageViewerStyles({ width, height });
  const [imageLoad, setImageLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.postImageWrapper}
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        {imageLoad && post_image_hash && (
          <Blurhash
            blurhash={post_image_hash}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: 999,
            }}
          />
        )}
        {source?.uri ? (
          <CacheImage
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setImageLoad(false)}
          />
        ) : (
          <Image
            source={source}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setImageLoad(false)}
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
                onLoad={() => setImageLoad(false)}
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
    </View>
  );
};

export default ImageViewer;
