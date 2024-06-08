import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ChallengeRequests/main";
import { useState } from "react";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";

const ChallengeRequests = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState(0);
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <StandardHeader title="Challenge Requests" backButton />
      <ScrollView>
        <View style={styles.content}></View>
      </ScrollView>
    </View>
  );
};

export default ChallengeRequests;
