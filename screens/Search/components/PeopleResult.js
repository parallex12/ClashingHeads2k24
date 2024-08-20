import { View, useWindowDimensions } from "react-native";
import { PeopleResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserApi from "../../../ApisManager/UserApi";
import { useQueryClient } from "react-query";

const PeopleResult = (props) => {
  let { searchQuery, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const user_details = userDataCached?.user;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const userapi = new UserApi();

  useEffect(() => {
    (async () => {
      let searched_users = await userapi.searchUsers(searchQuery);
      if (searched_users?.length > 0) {
        setUsers(searched_users);
      }
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
            icon
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
