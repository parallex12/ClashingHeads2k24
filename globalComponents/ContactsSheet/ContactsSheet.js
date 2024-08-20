import React, { memo, useEffect, useMemo, useState } from "react";
import { FlatList, TextInput, View, useWindowDimensions } from "react-native";
import { FindFriendsSheetStyles as _styles } from "../../styles/NewPost/main";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackDrop from "../../globalComponents/FlagReportBottomSheet/BackDrop";
import { font } from "../../styles/Global/main";
import { Text } from "react-native";
import StandardButton from "../../globalComponents/StandardButton";
import UserCard from "../../globalComponents/UserCard";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import UserApi from "../../ApisManager/UserApi";
import { useQueryClient } from "react-query";

const ContactsSheet = (props) => {
  let { bottomSheetRef, callBackUser } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const snapPoints = useMemo(() => ["25%", "80%"], []);
  const [searched_users, setSearched_users] = useState([]);
  const [user_friends, setUser_friends] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const current_user = userDataCached?.user;
  let { following, followers } = current_user;
  const dispatch = useDispatch();
  const userApi = new UserApi();

  useEffect(() => {
    const mergedUsers = mergeAndRemoveDuplicates(following, followers);
    setUser_friends(mergedUsers);
    if (searchQuery?.length > 0) {
      searchUsers(searchQuery);
    }
  }, [searchQuery, following, followers]);

  const mergeAndRemoveDuplicates = (arr1, arr2) => {
    const merged = [...arr1, ...arr2];
    const uniqueUsers = Array.from(new Set(merged.map((user) => user._id))).map(
      (id) => merged.find((user) => user._id === id)
    );
    return uniqueUsers;
  };

  const onUserSelect = async (item) => {
    callBackUser(item);
    bottomSheetRef.current.close();
  };

  const searchUsers = async (searchQuery) => {
    let searched_users = await userApi.searchUsers(searchQuery);
    let filtered = searched_users?.filter((e) => e?._id != current_user?._id);
    setUser_friends(filtered);
  };

  const memoizedUsers = useMemo(() => {
    return user_friends;
  }, [user_friends]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackDrop}
        enableContentPanningGesture={false}
        onChange={(e) => dispatch(onUpdateBottomSheet(e))}
      >
        <BottomSheetView style={styles.content}>
          <View style={styles.headerWrapper}>
            <Text style={font(22, "#111827", "Semibold")}>New Chat</Text>
            <StandardButton
              title="New Group"
              customStyles={styles.newGroupBtn}
            />
          </View>
          <View style={styles.searchInputWrapper}>
            <AntDesign name="search1" size={RFValue(15)} color="#9CA3AF" />
            <TextInput
              style={font(15, "#9CA3AF", "Regular", 0, null, {
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
                return (
                  <UserCard
                    author={item}
                    onCardPress={() => onUserSelect(item)}
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
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default memo(ContactsSheet);
