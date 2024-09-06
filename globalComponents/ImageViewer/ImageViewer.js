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
import { useState } from "react";
import FastImage from "react-native-fast-image";

const ImageViewer = (props) => {
  let { source } = props;
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
          <FastImage
            source={{ ...source, priority: FastImage.priority.normal }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
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
              <FastImage
                source={{ ...source, priority: FastImage.priority.normal }}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                source={source}
                resizeMode="contain"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ImageViewer;
