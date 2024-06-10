import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/News/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import FlagReportBottomSheet from "../../globalComponents/FlagReportBottomSheet/FlagReportBottomSheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPercent } from "../../middleware";
import SearchBar from "../../globalComponents/SearchBar";
import NewsCard from "../../globalComponents/NewsCard";
import axios from "axios";
import { sortPostsByCreatedAt } from "../../utils";
// api key 45b06648f48c47aaa5cad2280df9e6be
const News = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [newsArr, setNewsArr] = useState([]);
  const bottomFlagSheetRef = useRef();
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=45b06648f48c47aaa5cad2280df9e6be`
      );
      setNewsArr(sortPostsByCreatedAt(response.data.articles));
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="News"
        containerStyles={{ height: getPercent(15, height) }}
      />
      <View style={styles.titleHeaderWrapper}>
        <Text style={font(14, "#6B7280", "Medium", 5)}>Hey, Zeeshan</Text>
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
          <SearchBar  />
          <View style={styles.newsWrapper}>
            {newsArr?.map((item, index) => {
              return <NewsCard key={index} data={item} />;
            })}
          </View>
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default News;
