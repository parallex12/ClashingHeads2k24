import { Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/CreateClash/main";

const CreateClash = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return <View style={styles.container}></View>;
};

export default CreateClash;
