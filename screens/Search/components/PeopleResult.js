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
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect, useState } from "react";
import { selectAuthUser } from "../../../state-management/features/auth";
import { useNavigation } from "@react-navigation/native";
import { search_users } from "../../../state-management/apiCalls/search";

const PeopleResult = (props) => {
  let { searchQuery, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_details = useSelector(selectAuthUser);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let searched_users = await search_users(searchQuery);
      setUsers(searched_users);
    })();
  }, [searchQuery]);

  const onCardPress = (item) => {
    if (onPress) {
      return onPress(item);
    }
    if (item?._id == user_details?._id) {
      navigation?.navigate("MyProfile");
    } else {
      navigation?.navigate("UserProfile", {
        user: item,
      });
    }
  };

  return (
    <View style={styles.container}>
      {users?.map((item, index) => {
        return (
          <UserCard
            onCardPress={() => onCardPress(item)}
            author={item}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default memo(PeopleResult);
