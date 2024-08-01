import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/CreateClash/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { useCallback, useEffect, useState } from "react";
import StandardInput from "../../globalComponents/StandardInput";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import WaveAudioPlayer from "../../globalComponents/WaveAudioPlayer";
import WaveAudioRecorder from "../../globalComponents/WaveAudioRecorder";
import StandardButton from "../../globalComponents/StandardButton";
import RecordingPlayer from "../../globalComponents/RecordingPlayer";
import { fetchUsersByQuery } from "../../state-management/features/searchedUsers/searchedUsersSlice";
import { selectSearchedUsers } from "../../state-management/features/searchedUsers/searchedUsersSelector";
import _ from "lodash"; // Import lodash
import UserCard from "../../globalComponents/UserCard";
import { ActivityIndicator } from "react-native";
import PeopleResult from "../Search/components/PeopleResult";
import {
  createChallengeClash,
  validate_clash_details,
} from "../../middleware/firebase";
import {
  startLoading,
  stopLoading,
} from "../../state-management/features/screen_loader/loaderSlice";
import { addChallengeRequestForUser } from "../../state-management/features/challengeRequests/challengeRequestsSlice";
import { fetchAllChallengeClashes } from "../../state-management/features/allChallengeClashes/allChallengeClashesSlice";
import { search_users } from "../../state-management/apiCalls/search";
import { create_challenge_clash } from "../../state-management/apiCalls/challengeClash";

const CreateClash = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user_details = useSelector(selectAuthUser);
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [loading, setLoading] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUsers, setShowUsers] = useState(false);
  const [foundUsers, setFoundUsers] = useState(null);
  const dispatch = useDispatch();

  const [clashForm, setClashForm] = useState({
    title: null,
    challenger: user_details?._id, // The user who initiates the challenge
    opponent: null, // The user who is being challenged
    challenger_audio: recordedVoice?.getURI(),
    opponent_audio: null,
    status: "pending",
  });

  const onSendRequest = async () => {
    clashForm["challenger_audio"] = await recordedVoice?.getURI();
    clashForm["opponent"] = clashForm?.opponent?._id;
    setLoading(true);
    await validate_clash_details(clashForm)
      .then((res) => {
        if (res?.code == 200) {
          create_challenge_clash(clashForm)
            .then((res) => {
              console.log(res)
              props?.navigation.navigate("Home");
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e?.msg);
        setLoading(false);
      });
  };

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      return query;
    }, 300),
    []
  );

  useEffect(() => {
    if (searchQuery.length > 0) {
      setShowUsers(true);
      debouncedSearch(searchQuery);
    }
  }, [searchQuery, debouncedSearch]);

  const onSearchOpponent = async (query) => {
    setSearchQuery(query);
    let foundUsers = await search_users(query);
    setFoundUsers(foundUsers);
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Challange"
        searchIcon={false}
      />
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
            value={searchQuery}
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
          {showUsers && searchQuery?.length > 0 && (
            <PeopleResult
              onPress={(item) => {
                setClashForm((prev) => {
                  let alreadySelected = prev?.opponent?._id == item?._id;
                  return {
                    ...prev,
                    opponent: alreadySelected ? null : item,
                  };
                });
                setShowUsers(false);
                setSearchQuery("");
              }}
              isSelected={clashForm?.opponent?._id}
              users={foundUsers}
            />
          )}

          {clashForm?.opponent && searchQuery?.length == 0 && (
            <UserCard
              author={clashForm?.opponent}
              onCardPress={(item) =>
                setClashForm((prev) => {
                  return { ...prev, opponent: null };
                })
              }
              selectable
              isSelected={true}
            />
          )}
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
      <StandardButton
        loading={loading}
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
