import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import UserCard from "../../globalComponents/UserCard";
import ClashesResult from "./components/ClashesResult";
import PeopleResult from "./components/PeopleResult";
import { useState } from "react";
import PostsResult from "./components/PostsResult";
import NewsResult from "./components/NewsResult";

const Search = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState(0);
  let styles = _styles({ width, height });

  let resultOptions = [<PeopleResult />, <ClashesResult />,<PostsResult/>,<NewsResult/>];


  return (
    <View style={styles.container}>
      <Header activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <ScrollView>
        <View style={styles.resultCardWrapper}>
          {resultOptions[activeFilter]}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
