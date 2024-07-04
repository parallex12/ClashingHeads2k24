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

const PeopleResult = (props) => {
  let { onCardPress, searchQuery, isSelected } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { users, loading } = useSelector(selectSearchedUsers);
  const user_details = useSelector(selectAuthUser);

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

  return (
    <View style={styles.container}>
      {users
        ?.filter((e) => e?.id != user_details?.id)
        .map((item, index) => {
          return (
            <UserCard
              onCardPress={() => onCardPress(item)}
              author={item}
              isSelected={isSelected == item?.id}
              selectable
              key={index}
            />
          );
        })}
    </View>
  );
};

export default PeopleResult;
