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
import { useDispatch, useSelector } from "react-redux";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import UserApi from "../../ApisManager/UserApi";
import { rms } from "../../utils/responsiveSizing";
import useUserProfile from "../../Hooks/useUserProfile";

const ContactsSheet = (props) => {
  let { bottomSheetRef, callBackUser } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const snapPoints = useMemo(() => ["25%", "80%"], []);
  const [user_friends, setUser_friends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("a");
  const { data } = useUserProfile();
  const currentUser = data?.user;

  let { following, followers } = currentUser;
  const dispatch = useDispatch();
  const userApi = new UserApi();

  useEffect(() => {
    searchUsers(searchQuery);
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
  const mergedUsers = mergeAndRemoveDuplicates(following, followers);

  const searchUsers = async (searchQuery) => {
    let query = searchQuery?.toLowerCase();
    console.log(query);
    // let searched_users = await userApi.searchUsers(searchQuery);
    let filtered = mergedUsers?.filter((e) => {
      let username = e?.username?.toLowerCase();
      let realName = e?.realName?.toLowerCase();
      return username?.includes(query) || realName?.includes(query);
    });
    // const mergedArr = mergeAndRemoveDuplicates(mergedUsers, filtered);
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
            <Text style={font(18, "#111827", "Semibold")}>New Chat</Text>
            <StandardButton
              title="New Group"
              customStyles={styles.newGroupBtn}
            />
          </View>
          <View style={styles.searchInputWrapper}>
            <AntDesign name="search1" size={rms(15)} color="#9CA3AF" />
            <TextInput
              style={font(14, "#9CA3AF", "Regular", 0, null, {
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
