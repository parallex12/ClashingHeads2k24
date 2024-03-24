import { Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ScreenName/main";

const ScreenName = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return <View style={styles.container}></View>;
};

export default ScreenName;
