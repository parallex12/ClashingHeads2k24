import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import ClashesResult from "./components/ClashesResult";
import PeopleResult from "./components/PeopleResult";
import { useCallback,  useState } from "react";
import PostsResult from "./components/PostsResult";
import NewsResult from "./components/NewsResult";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { Instagram } from "react-content-loader/native";
import { StatusBar } from "expo-status-bar";

const Search = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("a");
  const [loading, setLoading] = useState(false);
  let styles = _styles({ width, height });
  const dispatch = useDispatch();

  let resultOptions = [
    <PeopleResult searchQuery={searchQuery} />,
    <ClashesResult searchQuery={searchQuery} />,
    <PostsResult searchQuery={searchQuery} />,
    <NewsResult searchQuery={searchQuery} />,
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
      setLoading(false);
    }, 500), // Adjust the delay as needed
    [activeFilter]
  );

  const onSearch = (query) => {
    debouncedSearch(query);
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <Header
        onChangeText={onSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ScrollView>
        <View style={styles.resultCardWrapper}>
          {loading ? <Instagram /> : resultOptions[activeFilter]}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
