import { Text, View, useWindowDimensions } from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import ChallengeCard from "../../../globalComponents/ChallengeCard/ChallengeCard";
import { useChallengesSearch } from "../../../Hooks/useSearch";

const ClashesResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const challengesQuery = useChallengesSearch(searchQuery);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Clashes</Text>
      </View>
      {challengesQuery?.data?.map((item, index) => {
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
