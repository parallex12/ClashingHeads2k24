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
import { memo, useEffect, useState } from "react";
import { sortPostsByCreatedAt } from "../../../utils";
import axios from "axios";
import NewsCard from "../../../globalComponents/NewsCard";
import { Instagram } from "react-content-loader/native";

const NewsResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [newsArr, setNewsArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchNews(searchQuery?.length > 0 ? searchQuery : "politics");
  }, [searchQuery]);

  const searchNews = async (text) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${text}&apiKey=30026c906e3044828175b52bbe0736bd`
      );
      setNewsArr(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching searched news:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending News</Text>
      </View>
      {loading ? (
        <Instagram />
      ) : (
        newsArr?.map((item, index) => {
          return <NewsCard key={index} data={item} />;
        })
      )}
    </View>
  );
};

export default memo(NewsResult);
