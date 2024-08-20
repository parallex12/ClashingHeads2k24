import React, { useState, useEffect } from "react";
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
import{ Facebook } from "react-content-loader/native";
import { useQueryClient } from "react-query";

const News = () => {
  const [newsArr, setNewsArr] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });

  useEffect(() => {
    setLoading(true);
    loadDefaultNews();
  }, []);

  const loadDefaultNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=45b06648f48c47aaa5cad2280df9e6be`
      );
      setNewsArr(sortPostsByCreatedAt(response.data.articles));
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching default news:", error);
    }
  };

  const searchNews = async (text) => {
    try {
      if (text?.length == 0) {
        loadDefaultNews();
        return;
      }
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${text}&apiKey=30026c906e3044828175b52bbe0736bd`
      );
      setNewsArr(sortPostsByCreatedAt(response.data.articles));
      setRefreshing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching searched news:", error);
    }
  };

  const handleSearch = (text) => {
    setRefreshing(true);
    setLoading(true);
    searchNews(text);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    loadDefaultNews();
  };

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <SearchBar onChangeText={handleSearch} />
          <View style={styles.newsWrapper}>
            {loading ? (
              <>
                <Facebook />
                <Facebook />
                <Facebook />
              </>
            ) : (
              newsArr.map((item, index) => <NewsCard key={index} data={item} />)
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default News;
