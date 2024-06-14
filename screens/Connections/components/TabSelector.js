import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TabSelectorStyles as _styles } from "../../../styles/Connections/main";
import { font } from "../../../styles/Global/main";
import { useState } from "react";

const TabSelector = (props) => {
  let { setActive, active, user } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let followers = Object.keys(user?.followers || {})?.length;
  let following = Object.keys(user?.following || {})?.length;
  let mutual = 0;
  let suggestions = 0;

  let tabItems = [
    {
      label: "Followers",
      total: followers,
    },
    {
      label: "Following",
      total: following,
    },
    {
      label: "Mutual",
      total: mutual,
    },
    {
      label: "Suggestions",
      total: suggestions,
    },
  ];

  const MenuItem = ({ item, index }) => {
    let color = active == index ? "#DB2727" : "#9CA3AF";
    let bordercolor = active == index ? "#DB2727" : "transparent";

    return (
      <TouchableOpacity
        style={[
          styles.ItemWrapper,
          {
            borderColor: bordercolor,
          },
        ]}
        onPress={() => setActive(index)}
      >
        <Text
          style={font(14, color, active == index ? "Medium" : "Regular", 10)}
        >
          {item?.total} {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {tabItems?.map((item, index) => {
          return <MenuItem index={index} item={item} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default TabSelector;
