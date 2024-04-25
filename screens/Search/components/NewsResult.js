import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { NewsResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
const NewsResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  
  return (
    <View style={styles.container}>
      {[1, 2, 3]?.map((item, index) => {
        return <UserCard key={index} />;
      })}
    </View>
  );
};

export default NewsResult;
