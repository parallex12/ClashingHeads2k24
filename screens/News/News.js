import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  useWindowDimensions,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { styles as _styles } from "../../styles/News/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import NewsCard from "../../globalComponents/NewsCard";
import { sortPostsByCreatedAt } from "../../utils";
import { font } from "../../styles/Global/main";
import SearchBar from "../../globalComponents/SearchBar";
import { getPercent } from "../../middleware";
import { Facebook } from "react-content-loader/native";
import { useQueryClient } from "react-query";
import NewsApi from "../../ApisManager/NewsApi";
import FeedFlatlist from "../../globalComponents/FeedFlatlist/FeedFlatlist";
import InfiniteFlatlist from "../../globalComponents/InfiniteFlatlist/InfiniteFlatlist";
import { useNewsApi, useNewsSearchApi } from "../../Hooks/useNewsApi";
import debounce from "lodash/debounce";

const News = () => {
  const [search, setSearch] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const newsQuery = useNewsApi();
  const searchQuery = useNewsSearchApi(search);

  // Debounce the search input
  const handleSearch = useCallback(
    debounce((text) => {
      setSearch(text);
      searchQuery.refetch(); // Refetch the data when search text changes
    }, 300), // Adjust the delay as needed (300ms in this example)
    []
  );

  return (
    <View style={styles.container}>
      <StandardHeader
        title="News Clash!"
        containerStyles={{ height: getPercent(15, height) }}
      />
      <View style={styles.titleHeaderWrapper}>
        <Text style={font(14, "#6B7280", "Medium", 5)}>
          Hey, {currentUser?.username} - Start a Clash on the News!
        </Text>
        <Text style={font(26, "#1F2937", "Bold", 5)}>
          Breaking Political News
        </Text>
      </View>

      {search?.length == 0 ? (
        <InfiniteFlatlist
          ListHeaderComponent={<SearchBar onChangeText={handleSearch} />}
          query={newsQuery}
          data={newsQuery?.newsData}
          renderItem={({ item, index }) => <NewsCard key={index} data={item} />}
        />
      ) : (
        <InfiniteFlatlist
          ListHeaderComponent={<SearchBar onChangeText={handleSearch} />}
          query={searchQuery}
          data={searchQuery?.newsData}
          renderItem={({ item, index }) => <NewsCard key={index} data={item} />}
        />
      )}
    </View>
  );
};

export default News;
