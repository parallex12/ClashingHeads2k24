import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { EmojisStyles } from "../../styles/Global/main";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EmojisArr } from "../../utils";

const Emojis = (props) => {
  let { onEmojiPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = EmojisStyles({ width, height });

  const EmojiItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.emojiItemCont}
        onPress={() => onEmojiPress(item)}
      >
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {EmojisArr?.map((item, index) => {
        return <EmojiItem key={index} item={item} />;
      })}
    </View>
  );
};

export default Emojis;
