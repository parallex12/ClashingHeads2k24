import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import ClashesResult from "./components/ClashesResult";
import PeopleResult from "./components/PeopleResult";
import { useCallback, useState } from "react";
import PostsResult from "./components/PostsResult";
import NewsResult from "./components/NewsResult";
import debounce from "lodash/debounce";
import { Instagram } from "react-content-loader/native";
import { StatusBar } from "expo-status-bar";
import { FlagReportSheetProvider } from "../../globalComponents/BottomSheet/FlagReportSheetProvider";
import { PostActionsSheetProvider } from "../../globalComponents/BottomSheet/PostActionsSheetProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../styles/Global/main";

const Search = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState({
    data: "People",
    index: 0,
  });
  const [searchQuery, setSearchQuery] = useState("a");
  const [loading, setLoading] = useState(false);
  let styles = _styles({ width, height });

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
    <FlagReportSheetProvider>
      <PostActionsSheetProvider>
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Header
            onChangeText={onSearch}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          {activeFilter?.index > 0 && (
            <View style={styles.headerCont}>
              <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
              <Text style={font(14, "#111827", "Medium")}>
                Trending {activeFilter?.data}
              </Text>
            </View>
          )}
          {loading ? <Instagram /> : resultOptions[activeFilter?.index]}
        </View>
      </PostActionsSheetProvider>
    </FlagReportSheetProvider>
  );
};

export default Search;
