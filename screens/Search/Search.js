import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import UserCard from "../../globalComponents/UserCard";
import ClashesResult from "./components/ClashesResult";
import PeopleResult from "./components/PeopleResult";
import { useEffect, useState } from "react";
import PostsResult from "./components/PostsResult";
import NewsResult from "./components/NewsResult";
import { useDispatch } from "react-redux";
import { fetchUsersByQuery } from "../../state-management/features/searchedUsers/searchedUsersSlice";

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

  useEffect(() => {
    dispatch(fetchUsersByQuery(""));
  }, []);

  const onSearch = (query) => {
    if (activeFilter == 0) {
      setSearchQuery(query);
      dispatch(fetchUsersByQuery(query));
    }
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
