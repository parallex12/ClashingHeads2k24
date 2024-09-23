import { ScrollView, View, useWindowDimensions } from "react-native";
import { PeopleResultStyles as _styles } from "../../../styles/Search/main";
import UserCard from "../../../globalComponents/UserCard";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserSearch } from "../../../Hooks/useSearch";
import useUserProfile from "../../../Hooks/useUserProfile";

const PeopleResult = (props) => {
  let { searchQuery, onPress } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const navigation = useNavigation();
  const userQuery = useUserSearch(searchQuery);

  const onCardPress = (item) => {
    if (onPress) {
      return onPress(item);
    }
    if (item?._id == currentUser?._id) {
      navigation?.navigate("MyProfile");
    } else {
      navigation?.navigate("UserProfile", {
        user: item,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

export default memo(PeopleResult);
