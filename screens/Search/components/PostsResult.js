import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { PostsResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
const PostsResult = (props) => {
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

export default PostsResult;
