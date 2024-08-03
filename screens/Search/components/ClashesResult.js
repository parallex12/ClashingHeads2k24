import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import { useSelector } from "react-redux";
import { selectAllChallengeClashes } from "../../../state-management/features/allChallengeClashes";
import { memo, useEffect, useState } from "react";
import DualClashCard from "./DualClashCard";
import { selectSearched } from "../../../state-management/features/searchedUsers";
import { Instagram } from "react-content-loader/native";
import { search_clashes, search_posts } from "../../../state-management/apiCalls/search";
import { useNavigation } from "@react-navigation/native";

const ClashesResult = (props) => {
  let { searchQuery } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashes, setClashes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let searched_clashes = await search_clashes(searchQuery);
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
          <DualClashCard
            divider
            key={index}
            data={item}
            onPress={() =>
              navigation?.navigate("ChallengeClash", { ...item })
            }
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
