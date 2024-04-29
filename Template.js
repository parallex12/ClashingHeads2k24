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
  
  const News = (props) => {
    let {} = props;
    let { width, height } = useWindowDimensions();
    let styles = _styles({ width, height });
  
    return (
      <View style={styles.container}>
        <StandardHeader title="News" backButton />
        <ScrollView>
          <View style={styles.content}></View>
        </ScrollView>
        <BottomMenu />
      </View>
    );
  };
  
  export default News;
  