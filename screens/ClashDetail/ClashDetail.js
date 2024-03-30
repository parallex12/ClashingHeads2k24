import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { getPercent } from "../../middleware";
import ClashCard from "./components/ClashCard";
import { useState } from "react";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let prevData = props?.route?.params?.data;
  const [postClashes, setPostClashes] = useState([1, 2, 3,4]);

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Post"
        searchIcon={false}
      />
      <ScrollView>
        <View style={styles.content}>
          <PostCard postDateAndViews data={prevData} />
          <View style={styles.clashes_wrapper}>
            {postClashes.map((item, index) => {
              let showHrLine = index + 1 == postClashes?.length;
              return (
                <ClashCard
                  hrLine={!showHrLine}
                  postDateAndViews
                  data={prevData}
                  key={index}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default ClashDetails;
