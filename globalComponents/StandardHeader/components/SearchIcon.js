import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { getPercent } from "../../../middleware";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchIcon = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let navigation = useNavigation();

  const onSearch = () => {
    navigation.navigate("Search");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onSearch}>
      <AntDesign name="search1" size={getPercent(2.7, height)} color="#fff" />
    </TouchableOpacity>
  );
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    container: {
      width: getPercent(4.7, height),
      height: getPercent(4.7, height),
      borderRadius: 100,
      backgroundColor: "rgba(255,255,255,0.26)",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default SearchIcon;
