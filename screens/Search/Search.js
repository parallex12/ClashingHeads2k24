import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import UserCard from "../../globalComponents/UserCard";
import ClashesResult from "./components/ClashesResult";
import PeopleResult from "./components/PeopleResult";
import { useCallback, useEffect, useState } from "react";
import PostsResult from "./components/PostsResult";
import NewsResult from "./components/NewsResult";
import { useDispatch } from "react-redux";
import {
  fetchClashesByQuery,
  fetchPostsByQuery,
  fetchUsersByQuery,
} from "../../state-management/features/searchedUsers/searchedUsersSlice";
import debounce from "lodash/debounce";

const Search = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  let styles = _styles({ width, height });
  const dispatch = useDispatch();

  let resultOptions = [
    <PeopleResult searchQuery={searchQuery} />,
    <ClashesResult searchQuery={searchQuery} />,
    <PostsResult searchQuery={searchQuery} />,
    <NewsResult searchQuery={searchQuery} />,
  ];

  let filterQueryFunctions = [
    fetchUsersByQuery,
    fetchClashesByQuery,
    fetchPostsByQuery,
  ];

  useEffect(() => {
    if (activeFilter == 3) return;
    dispatch(filterQueryFunctions[activeFilter](""));
  }, [activeFilter]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
    setSearchQuery(query);
      if (activeFilter == 3) return;
      dispatch(filterQueryFunctions[activeFilter](query));
    }, 500), // Adjust the delay as needed
    [activeFilter]
  );

  const onSearch = (query) => {
    debouncedSearch(query);
  };

  return (
    <View style={styles.container}>
      <Header
        onChangeText={onSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ScrollView>
        <View style={styles.resultCardWrapper}>
          {resultOptions[activeFilter]}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
