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
import { selectSearched, } from "../../../state-management/features/searchedUsers";
import { selectAuthUser } from "../../../state-management/features/auth";
import { useNavigation } from "@react-navigation/native";
import ContentLoader from "react-content-loader/native";
import { getPercent } from "../../../middleware";

const PeopleResult = (props) => {
  let { searchQuery, isSelected } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { users, loading } = useSelector(selectSearched);
  const user_details = useSelector(selectAuthUser);
  const navigation = useNavigation();

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
      {loading ? (
        <ContentLoader style={{ top: 20 }} width={getPercent(100, width)} />
      ) : (
        users?.map((item, index) => {
          return (
            <UserCard
              onCardPress={() => onCardPress(item)}
              author={item}
              key={index}
            />
          );
        })
      )}
    </View>
  );
};

export default memo(PeopleResult);
