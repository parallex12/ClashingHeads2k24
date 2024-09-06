import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TypingComponentExtraViewerStyles as _styles } from "../../../styles/Global/main";
import { getPercent } from "../../../middleware";
import { useEffect, useRef, useState } from "react";
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";
import StandardButton from "../../../globalComponents/StandardButton";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import ReplyCard from "./ReplyCard";

const TypingComponentExtraViewer = (props) => {
  let { data,  msg_content, onDeleteMedia } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const viewerAnime = useRef(new Animated.Value(0)).current;
  const [contHeight, setContHeight] = useState(null);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContHeight(eval(height)); // Set the height of the view
  };

  useEffect(() => {
    if (!contHeight) return;
    Animated.timing(viewerAnime, {
      toValue: contHeight,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [contHeight]);

  let animationStyles = {
    transform: [
      {
        translateY: viewerAnime.interpolate({
          inputRange: [0, contHeight],
          outputRange: [0, -contHeight],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[styles.container, animationStyles]}
      onLayout={handleLayout}
    >
      {data?.reply && (
        <View style={styles.innerReplyContainer}>
          <ReplyCard content={msg_content} />
          <StandardButton
            customStyles={styles.timesBtn}
            rightIcon={<FontAwesome5 name="times" size={14} color="#fff" />}
            onPress={() => onDeleteMedia("all")}
          />
        </View>
      )}
      {(data?.image || data?.audio) && (
        <View style={styles.mediaContainer}>
          {data?.image && (
            <View style={styles.mediaWrapper}>
              <ImageViewer
                source={{ uri: data?.image }}
                style={styles.mediaImg}
                isLocal
              />
            </View>
          )}
          {data?.audio && (
            <View style={styles.mediaWrapper}>
              <WaveAudioPlayer
                source={data?.audio}
                audioResetBtn
                audioResetFunc={() => onDeleteMedia("audio")}
              />
            </View>
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default TypingComponentExtraViewer;
