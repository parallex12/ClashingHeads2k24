import {
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
import { useRef } from "react";
import { getPercent } from "../../middleware";
import SearchBar from "../../globalComponents/SearchBar";
import NewsCard from "../../globalComponents/NewsCard";

const News = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  let newsArr = new Array(10).fill(0);

  return (
    <View style={styles.container}>
      <StandardHeader
        title="News"
        containerStyles={{ height: getPercent(15, height) }}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titleHeaderWrapper}>
            <Text style={font(14, "#6B7280", "Medium", 5)}>Hey, Zeeshan</Text>
            <Text style={font(26, "#1F2937", "Bold", 5)}>
              Breaking Political News
            </Text>
            <SearchBar customStyles={{ marginVertical: 10 }} />
          </View>
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
