import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";
import { getPercent } from "../../../middleware";
import { onShareApp } from "../../../utils";
import StandardButton from "../../../globalComponents/StandardButton";

const DualClashCard = (props) => {
  let { data, request_type, onAcceptRequest, onCancelRequest } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  let challenger = data?.challenger;
  let opponent = data?.opponent;
  let votes = Object.keys(data?.votes).length
  let opinions = data?.opinions
  let status = data?.status

  const ClashUserCard = ({ user, type, audio, hasAccepted, shouldAccepted }) => {
    return (
      <View style={styles.clashUserItem}>
        <View style={styles.clashUserProfile}>
          <Image
            source={{ uri: user?.profile_photo }}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(14, "#000000", "Semibold", 3)}>{user?.realName}</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>{type}</Text>
        {audio && <WaveAudioPlayer showDuration iconSize={15} source={audio} />}
        {/* {!hasAccepted &&
          <StandardButton
            title="Cancel Request"
            customStyles={styles.requetBtn}
            textStyles={styles.requetBtnText}
          />
        } */}
        {!hasAccepted ?
          request_type == "Recieved" ?
            <StandardButton
              title="Accept Request"
              customStyles={styles.requetBtn}
              textStyles={styles.requetBtnText}
              onPress={onAcceptRequest}
            />
            : request_type == "Sent" ?
              <StandardButton
                title="Cancel Request"
                customStyles={styles.requetBtn}
                textStyles={styles.requetBtnText}
                onPress={onCancelRequest}
              />
              : null
          : null
        }
      </View>
    );
  };

  const CardFooter = ({ votes, opinions }) => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFooterItem}>
          <FontAwesome6 name="users" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            {votes} Voted
          </Text>
        </View>
        <View style={styles.cardFooterItem}>
          <MaterialIcons name="multitrack-audio" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            {opinions} Opinions
          </Text>
        </View>
        <View style={styles.cardFooterItem}>
          <Image
            source={require("../../../assets/icons/post_cards/flag.png")}
            resizeMode="contain"
            style={{
              width: getPercent(4, width),
              height: getPercent(4, width),
            }}
          />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            Report
          </Text>
        </View>
        <TouchableOpacity style={styles.cardFooterItem} onPress={() => onShareApp()}>
          <Image
            source={require("../../../assets/icons/post_cards/share.png")}
            resizeMode="contain"
            style={{
              width: getPercent(4, width),
              height: getPercent(4, width),
            }}
          />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ClashesCard = ({ }) => {
    return (
      <View style={styles.clashesCardCont}>
        <Text style={styles.clashesCardTitle}>
          “{data?.title}”
        </Text>
        <View style={styles.clashesCardUsersCont}>
          <ClashUserCard
            user={challenger}
            audio={data?.challenger_audio}
            type="Challenger"
            hasAccepted={true}
          />
          <Text style={styles.vsText}>VS</Text>
          <ClashUserCard
            user={opponent}
            audio={data?.opponent_audio}
            type="Opponent"
            hasAccepted={status == "accepted"}
          />
        </View>
        <CardFooter votes={votes} opinions={opinions} />
      </View>
    );
  };

  return <ClashesCard />;
};

export default DualClashCard;
