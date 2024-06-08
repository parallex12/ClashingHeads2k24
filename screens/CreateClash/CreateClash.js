import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/CreateClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { useState } from "react";
import StandardInput from "../../globalComponents/StandardInput";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import WaveAudioPlayer from "../../globalComponents/WaveAudioPlayer";
import WaveAudioRecorder from "../../globalComponents/WaveAudioRecorder";
import StandardButton from "../../globalComponents/StandardButton";
import RecordingPlayer from "../../globalComponents/RecordingPlayer";

const CreateClash = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_details = useSelector(selectAuthUser);
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const [clashForm, setClashForm] = useState({
    title: null,
    challenger: user_details, // The user who initiates the challenge
    opponent: null, // The user who is being challenged
    challenger_audio: recordedVoice?.getURI(),
    opponent_audio: null,
    createdAt: new Date().toISOString(),
    opinions: 0,
    voted: 0,
    votes: {},
    views: 0,
    isChallengeDone: false,
  });

  const onSendRequest = () => {};
  const onSearchOpponent = () => {};

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Challange Clash"
        searchIcon={false}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.formWrapper}>
            <StandardInput
              value={clashForm?.title}
              data={{
                title: "Clash Title",
                key: "clashTitle",
                placeholder: "Enter Clash title here...",
                type: "text",
              }}
              inputStyles={{ borderRadius: 10 }}
              onChangeText={(val) =>
                setClashForm((prev) => {
                  return { ...prev, title: val };
                })
              }
              titleTextStyle={{ fontSize: RFValue(13) }}
            />
            <StandardInput
              value={clashForm?.title}
              data={{
                title: "Who you would like to challenge?",
                key: "clashOpponent",
                placeholder: "Enter challenge’s username or email",
                type: "text",
              }}
              titleTextStyle={{ fontSize: RFValue(13) }}
              inputStyles={{ borderRadius: 10, flexDirection: "row-reverse" }}
              onChangeText={(val) => onSearchOpponent(val)}
              customIcon={
                <AntDesign
                  name="search1"
                  size={RFValue(15)}
                  color="#9CA3AF"
                  style={{ marginRight: 10 }}
                />
              }
            />
            <View style={styles.recordingWrapper}>
              <Text style={styles.inputText}>
                Record your opinion on this topic
              </Text>
              {recordedVoice ? (
                <WaveAudioPlayer
                  audioResetBtn
                  source={recordedVoice?.getURI()}
                  audioResetFunc={() => {
                    setRecordedVoice(null);
                    setRecordingDuration(0);
                  }}
                />
              ) : (
                <WaveAudioRecorder
                  setRecordedVoice={setRecordedVoice}
                  setRecordingDuration={setRecordingDuration}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <StandardButton
        title="Send  Clash Request"
        customStyles={{
          width: "90%",
          height: getPercent(6, height),
        }}
        onPress={onSendRequest}
      />
    </View>
  );
};

export default CreateClash;
