import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { StickersStyles } from "../../styles/Global/main";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { stickerArr } from "../../utils";
import { ScrollView } from "react-native";
import WaveAudioPlayer from "../WaveAudioPlayer";
import { getPercent } from "../../middleware";

const Stickers = (props) => {
  let { selectedSticker, setSelectedSticker } = props;
  let { width, height } = useWindowDimensions();
  let styles = StickersStyles({ width, height });

  const StickersItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.emojiItemCont,
          { borderColor: selectedSticker == index ? "#222" : "#fff" },
        ]}
        onPress={() => setSelectedSticker(index)}
      >
        <Image
          source={item?.img}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stickerArr?.map((item, index) => {
          return <StickersItem key={index} index={index} item={item} />;
        })}
      </ScrollView>

      {selectedSticker != undefined && (
        <WaveAudioPlayer
          audioResetBtn
          localSource={stickerArr[selectedSticker].audio}
        />
      )}
    </View>
  );
};

export default Stickers;
