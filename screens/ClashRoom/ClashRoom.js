import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/ClashRoom/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { getPercent } from "../../middleware";
import { useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import ClashersCard from "./components/ClashersCard";
import TranscriptCard from "./components/TranscriptCard";
import BottomActionsMenu from "./components/BottomActionsMenu";
import VoiceRecorderBottomSheet from "../../globalComponents/VoiceRecorderBottomSheet/VoiceRecorderBottomSheet";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ClashRoom = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let isOwner = props?.route?.params?.type;
  const [clashers, setClashers] = useState(
    new Array(isOwner ? 1 : 20).fill("")
  );
  const bottomVoiceSheetRef = useRef(null);
  const navigation = useNavigation();

  const AddClashersButton = () => {
    return (
      <TouchableOpacity
        style={styles.addClashersButtonContainer}
        onPress={() => navigation.navigate("AddClashers")}
      >
        <View style={styles.addBtnCircle}>
          <AntDesign name="plus" size={20} color="#DB2727" />
        </View>
        <Text style={font(12, "#DB2727", "Medium", 3)}>Add Clashers</Text>
        <Text style={font(11, "#9CA3AF", "Medium", 0)}>Max 20</Text>
      </TouchableOpacity>
    );
  };

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
                <AddClashersButton />
              </View>
            </ScrollView>
          </View>
          <View style={styles.transcript_clashersContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.clashersInnerContainer}>
                <Text style={font(12, "#9CA3AF", "Regular")}>
                  Transcript...
                </Text>
                {!isOwner && <TranscriptCard />}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <BottomActionsMenu
        onMicPress={() => bottomVoiceSheetRef.current?.present()}
      />
      <VoiceRecorderBottomSheet bottomVoiceSheetRef={bottomVoiceSheetRef} />
    </View>
  );
};

export default ClashRoom;
