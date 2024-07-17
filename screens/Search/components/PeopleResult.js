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
import { useCallback, useEffect, useState } from "react";
import { selectSearchedUsers } from "../../../state-management/features/searchedUsers";
import _ from "lodash"; // Import lodash
import { selectAuthUser } from "../../../state-management/features/auth";
import { useNavigation } from "@react-navigation/native";

const PeopleResult = (props) => {
  let { searchQuery, isSelected } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { users, loading } = useSelector(selectSearchedUsers);
  const user_details = useSelector(selectAuthUser);
  const navigation=useNavigation()
  const [showUsers, setShowUsers] = useState(false);
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      return query;
    }, 300),
    []
  );

  useEffect(() => {
    if (searchQuery?.length > 0) {
      setShowUsers(true);
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch]);

  const onCardPress = (item) => {
    if (item?.id == user_details?.id) {
      navigation?.navigate("MyProfile");
    } else {
      navigation?.navigate("UserProfile", {
        user: item,
      });
    }
  };

  return (
    <View style={styles.container}>
      {users
        .map((item, index) => {
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

export default PeopleResult;
