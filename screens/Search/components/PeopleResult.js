import { View, useWindowDimensions } from "react-native";
import { PeopleResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
import { memo} from "react";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import { useUserSearch } from "../../../Hooks/useSearch";

const PeopleResult = (props) => {
  let { searchQuery, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const user_details = userDataCached?.user;
  const navigation = useNavigation();
  const userQuery = useUserSearch(searchQuery);

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
      {userQuery?.data?.map((item, index) => {
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
