import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { PeopleResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
import { useSelector } from "react-redux";
const PeopleResult = (props) => {
  let { users, onCardPress, isSelected } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  return (
    <View style={styles.container}>
      {users?.map((item, index) => {
        return (
          <UserCard
            onCardPress={() => onCardPress(item)}
            author={item}
            isSelected={isSelected==item?.id}
            selectable
            key={index}
          />
        );
      })}
    </View>
  );
};

export default PeopleResult;
