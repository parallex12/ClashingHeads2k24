import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SenderMessagestyles as _styles } from "../../../styles/Global/main";
import { formatTime } from "../../../middleware";

const SenderMessage = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <>
      <Text style={styles.time}>{formatTime(data?.createdAt)}</Text>
      <View style={styles.container}>
        <Text style={styles.text}>{data?.text}</Text>
      </View>
    </>
  );
};

export default SenderMessage;
