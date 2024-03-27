import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashDetails/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";

const ClashDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <StandardHeader />
      <ScrollView>
        <View style={styles.content}>
          {[1, 2, 3]?.map((item, index) => {
            return <PostCard key={index} />;
          })}
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default ClashDetails;
