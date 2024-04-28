import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/AddClashers/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { RFValue } from "react-native-responsive-fontsize";
import SearchBar from "../../globalComponents/SearchBar";
import UserCard from "../../globalComponents/UserCard";

const AddClashers = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const [selectedClashers, setSelectedClashers] = useState([]);
  let allTempClashers = new Array(10).fill(null);

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Add Clashers"
        searchIcon={false}
        rightIcon={
          selectedClashers?.length > 0 && (
            <StandardButton
              title="Done"
              customStyles={{
                backgroundColor: "#fff",
                width: getPercent(17, width),
                height: getPercent(4, height),
              }}
              textStyles={{
                color: "#DB2727",
                fontFamily: "Medium",
                fontSize: RFValue(12),
              }}
              onPress={()=>props?.navigation?.navigate("Home")}
            />
          )
        }
      />
      <ScrollView>
        <View style={styles.content}>
          <SearchBar placeholder="Search by username" />
          {allTempClashers?.map((item, index) => {
            return (
              <UserCard
                selectable
                isSelected={selectedClashers?.includes(index)}
                key={index}
                onCardPress={() =>
                  setSelectedClashers((prev) => {
                    if (prev.includes(index)) {
                      return prev.filter((item) => item !== index);
                    } else {
                      return [...prev, index];
                    }
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddClashers;
