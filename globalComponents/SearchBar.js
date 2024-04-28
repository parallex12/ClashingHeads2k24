import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SearchBarStyles, font } from "../styles/Global/main";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const SearchBar = (props) => {
  let { customStyles, placeholder } = props;
  let { width, height } = useWindowDimensions();
  let styles = SearchBarStyles({ width, height });
  let navigation = useNavigation();

  return (
    <View style={styles.searchRow}>
      <View style={styles.searchInputWrapper}>
        <AntDesign name="search1" size={RFValue(15)} color="#9CA3AF" />
        <TextInput
          style={font(12, "#9CA3AF", "Regular", 0, null, {
            marginLeft: 8,
            flex: 1,
          })}
          placeholder={placeholder || "Search"}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );
};

export default SearchBar;
