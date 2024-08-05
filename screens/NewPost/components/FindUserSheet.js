import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FindFriendsSheetStyles as _styles } from "../../../styles/NewPost/main";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackDrop from "../../../globalComponents/FlagReportBottomSheet/BackDrop";
import { font } from "../../../styles/Global/main";
import { Text } from "react-native";
import StandardButton from "../../../globalComponents/StandardButton";
import UserCard from "../../../globalComponents/UserCard";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { search_users } from "../../../state-management/apiCalls/search";
import { getPercent } from "../../../middleware";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../state-management/features/auth";

const FindUserSheet = (props) => {
  let { bottomSheetRef, callBackUser } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const snapPoints = useMemo(() => ["25%", "60%"], []);
  const [searched_users, setSearched_users] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("a");
  const current_user = useSelector(selectAuthUser);
  let { following, followers } = current_user;

  useEffect(() => {
    const mergedUsers = mergeAndRemoveDuplicates(following, followers);
    setSearched_users(mergedUsers);
    searchUsers(searchQuery);
  }, [searchQuery, following, followers]);

  const mergeAndRemoveDuplicates = (arr1, arr2) => {
    const merged = [...arr1, ...arr2];
    const uniqueUsers = Array.from(new Set(merged.map((user) => user._id))).map(
      (id) => merged.find((user) => user._id === id)
    );
    return uniqueUsers;
  };

  const searchUsers = async (searchQuery) => {
    let searched_users = await search_users(searchQuery);
    setSearched_users(searched_users);
  };

  const onUserSelect = async () => {
    if (!selectedUser) return alert("Select a opponent");
    callBackUser(selectedUser);
    setSelectedUser(null);
    setSearchQuery("a");
    bottomSheetRef.current.close();
  };

  const memoizedUsers = useMemo(() => {
    return searched_users;
  }, [searched_users]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackDrop}
        enableContentPanningGesture={false}
      >
        <BottomSheetView style={styles.content}>
          <Text style={font(15, "#111827", "Regular")}>
            Choose your opponent
          </Text>
          <View style={styles.searchInputWrapper}>
            <AntDesign name="search1" size={RFValue(15)} color="#9CA3AF" />
            <TextInput
              style={font(12, "#9CA3AF", "Regular", 0, null, {
                marginLeft: 8,
                flex: 1,
              })}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              onChangeText={(val) => setSearchQuery(val)}
            />
          </View>
          <View style={styles.users_wrapper}>
            <FlatList
              data={memoizedUsers}
              renderItem={({ item, index }) => {
                if (item?._id == current_user?._id) return null;
                return (
                  <UserCard
                    selectable
                    isSelected={selectedUser?._id == item?._id}
                    author={item}
                    onCardPress={() => setSelectedUser(item)}
                  />
                );
              }}
              keyExtractor={(item) => item?._id?.toString()}
              onEndReached={null}
              onEndReachedThreshold={0.6}
              removeClippedSubviews
              windowSize={10}
            />
          </View>
          <StandardButton
            title="Confirm"
            customStyles={{
              width: "50%",
              marginVertical: 10,
              alignSelf: "center",
            }}
            onPress={onUserSelect}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default memo(FindUserSheet);