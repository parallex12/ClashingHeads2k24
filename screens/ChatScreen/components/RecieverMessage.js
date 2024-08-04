import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecieverMessagestyles as _styles } from "../../../styles/Global/main";
import { formatTime } from "../../../middleware";

const RecieverMessage = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <>
      <Text style={styles.time}>{formatTime(data?.createdAt)}</Text>
      <View style={styles.container}>
        <Text style={styles.text}>{data?.message}</Text>
      </View>
    </>
  );
};

export default RecieverMessage;
