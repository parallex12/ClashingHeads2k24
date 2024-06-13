import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { headerStyles as _styles } from "../../../styles/Search/main";
import BackButton from "../../../globalComponents/BackButton";
import { AntDesign } from "@expo/vector-icons";
import { getPercent } from "../../../middleware";
import { font } from "../../../styles/Global/main";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";

const Header = (props) => {
  let {activeFilter, onChangeText,setActiveFilter} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let filtersOption = ["People", "Clashes", "Posts","News"];

  const FilterItem = ({ data, index }) => {
    let conditional_style = {
      backgroundColor: activeFilter == index ? "rgba(219,39,39,0.1)" : "#fff",
      textColor: activeFilter == index ? "#DB2727" : "#111827",
    };
    
    return (
      <TouchableOpacity
        style={[
          styles.filterItem,
          { backgroundColor: conditional_style?.backgroundColor },
        ]}
        onPress={() => setActiveFilter(index)}
      >
        <Text style={font(12, conditional_style?.textColor, "Medium")}>
          {data}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <BackButton
          customStyles={{
            alignSelf: "center",
            alignItems: "center",
          }}
        />
        <View style={styles.searchInputWrapper}>
          <AntDesign name="search1" size={RFValue(15)} color="#9CA3AF" />
          <TextInput
            style={font(12, "#9CA3AF", "Regular", 0, null, { marginLeft: 8,flex:1 })}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            onChangeText={onChangeText}
          />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filtersWrapper}>
          {filtersOption?.map((item, index) => {
            return <FilterItem key={index} index={index} data={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Header;
