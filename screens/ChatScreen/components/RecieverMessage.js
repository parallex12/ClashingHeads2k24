import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecieverMessagestyles as _styles } from "../../../styles/Global/main";

const RecieverMessage = (props) => {
  let {data} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data?.text}
      </Text>
    </View>
  );
};

export default RecieverMessage;