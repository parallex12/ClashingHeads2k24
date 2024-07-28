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
import { memo } from "react";
import DualClashCard from "./DualClashCard";
import { selectSearched } from "../../../state-management/features/searchedUsers";
import { Instagram } from "react-content-loader/native";

const ClashesResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const { clashes, loading } = useSelector(selectSearched);

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Clashes</Text>
      </View>
      {loading ? (
        <Instagram />
      ) : (
        clashes?.map((item, index) => {
          return (
            <DualClashCard
              key={index}
              data={item}
              onPress={() =>
                props?.navigation?.navigate("ChallengeClash", { ...item })
              }
              onClashesPress={() =>
                props?.navigation?.navigate("ChallengeClash", { ...item })
              }
            />
          );
        })
      )}
    </View>
  );
};

export default memo(ClashesResult);
