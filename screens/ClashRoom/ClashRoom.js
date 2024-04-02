import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { styles as _styles } from "../../styles/ClashRoom/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { getPercent } from "../../middleware";
import { useState } from "react";
import { font } from "../../styles/Global/main";
import ClashersCard from "./components/ClashersCard";
import TranscriptCard from "./components/TranscriptCard";
import BottomActionsMenu from "./components/BottomActionsMenu";

const ClashRoom = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [clashers, setClashers] = useState(new Array(20).fill(""));

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Room"
        searchIcon={false}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text style={font(12, "#DB2727", "Semibold", 5)}>CLASH TOPIC</Text>
          <Text style={font(16, "#1C1C1C", "Semibold", 5)}>
            Should we eliminate taxes for the wealthy people?
          </Text>
          <View style={styles.clashersContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.clashersInnerContainer}>
                {clashers?.map((item, index) => {
                  return <ClashersCard key={index} data={item} index={index} />;
                })}
              </View>
            </ScrollView>
          </View>
          <View style={styles.transcript_clashersContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.clashersInnerContainer}>
                <TranscriptCard />
                <TranscriptCard />
                <TranscriptCard />
                <TranscriptCard />
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <BottomActionsMenu />
    </View>
  );
};

export default ClashRoom;
