import {
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { StickersStyles } from "../../styles/Global/main";
import { stickerArr } from "../../utils";
import { ScrollView } from "react-native";
import WaveAudioPlayer from "../WaveAudioPlayer";
import { useState } from "react";

const StickersItem = ({ item, index, onPress, selectedSticker }) => {
  let { width, height } = useWindowDimensions();
  let styles = StickersStyles({ width, height });
  return (
    <TouchableOpacity
      style={[
        styles.emojiItemCont,
        { borderColor: selectedSticker == index ? "#222" : "#fff" },
      ]}
      onPress={onPress}
    >
      <Image
        source={item?.img}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </TouchableOpacity>
  );
};

const Stickers = (props) => {
  let { selectedSticker, setSelectedSticker } = props;
  let { width, height } = useWindowDimensions();
  let styles = StickersStyles({ width, height });

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stickerArr?.map((item, index) => {
          return (
            <StickersItem
              onPress={() => {
                setSelectedSticker(index);
              }}
              key={index}
              index={index}
              item={item}
              selectedSticker={selectedSticker}
            />
          );
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
