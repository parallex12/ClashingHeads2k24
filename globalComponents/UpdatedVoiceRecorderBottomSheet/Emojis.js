import {
  Image,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { EmojisStyles } from "../../styles/Global/main";
import { EmojisArr } from "../../utils";

const EmojiItem = ({ item, onPress }) => {
  let { width, height } = useWindowDimensions();
  let styles = EmojisStyles({ width, height });

  return (
    <TouchableOpacity style={styles.emojiItemCont} onPress={onPress}>
      <Image
        source={item?.icon}
        resizeMode="contain"
        style={{ width: "100%", height: "100%" }}
      />
    </TouchableOpacity>
  );
};

const Emojis = (props) => {
  let { onEmojiPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = EmojisStyles({ width, height });

  return (
    <View style={styles.container}>
      {EmojisArr?.map((item, index) => {
        return (
          <EmojiItem
            onPress={() => onEmojiPress(item)}
            key={index}
            item={item}
          />
        );
      })}
    </View>
  );
};

export default Emojis;
