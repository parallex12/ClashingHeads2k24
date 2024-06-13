import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { NewsResultStyles as _styles } from "../../../styles/Search/main";
import { Image } from "react-native";
import { useEffect, useState } from "react";
import { sortPostsByCreatedAt } from "../../../utils";
import axios from "axios";
import NewsCard from "../../../globalComponents/NewsCard";

const NewsResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [newsArr, setNewsArr] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    loadDefaultNews();
    searchNews("politics");
  }, []);

  const loadDefaultNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=45b06648f48c47aaa5cad2280df9e6be`
      );
      setNewsArr(sortPostsByCreatedAt(response.data.articles));
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching default news:", error);
    }
  };

  const searchNews = async (text) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${text}&apiKey=45b06648f48c47aaa5cad2280df9e6be`
      );
      setNewsArr(sortPostsByCreatedAt(response.data.articles));
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching searched news:", error);
    }
  };

  const handleSearch = (text) => {
    setRefreshing(true);
    searchNews(text);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDefaultNews();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending News</Text>
      </View>
      {newsArr?.map((item, index) => {
        return <NewsCard key={index} data={item} />;
      })}
    </View>
  );
};

export default NewsResult;
