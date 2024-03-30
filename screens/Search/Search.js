import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/Search/main";
import Header from "./components/Header";
import UserCard from "../../globalComponents/UserCard";

const Search = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const ResultCard = ({}) => {
    return <UserCard />;
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.resultCardWrapper}>
          {[1, 2, 3, 4, 5, 6, 7]?.map((item, index) => {
            return <ResultCard key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
