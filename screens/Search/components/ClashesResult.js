import { Text, View, useWindowDimensions } from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { memo, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ChallengeCard from "../../../globalComponents/ChallengeCard/ChallengeCard";
import PostApi from "../../../ApisManager/PostApi";

const ClashesResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashes, setClashes] = useState([]);
  const navigation = useNavigation();
  const postapi = new PostApi();

  useEffect(() => {
    (async () => {
      let searched_clashes = await postapi.searchChallenges(searchQuery);
      setClashes(searched_clashes);
    })();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Clashes</Text>
      </View>
      {clashes?.map((item, index) => {
        return (
          <ChallengeCard
            divider
            key={index}
            data={item}
            onPress={() => navigation?.navigate("ChallengeClash", { ...item })}
            onClashesPress={() =>
              navigation?.navigate("ChallengeClash", { ...item })
            }
          />
        );
      })}
    </View>
  );
};

export default memo(ClashesResult);
