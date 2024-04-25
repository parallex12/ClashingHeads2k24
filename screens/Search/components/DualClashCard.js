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

const DualClashCard = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const ClashUserCard = ({}) => {
    return (
      <View style={styles.clashUserItem}>
        <View style={styles.clashUserProfile}>
          <Image
            source={require("../../../assets/icon.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(14, "#000000", "Semibold", 3)}>Zeeshan Karim</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>Challenger</Text>
        <WaveAudioPlayer iconSize={15} />
      </View>
    );
  };

  const CardFooter = () => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFooterItem}>
          <FontAwesome6 name="users" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            23 Voted
          </Text>
        </View>
        <View style={styles.cardFooterItem}>
          <MaterialIcons name="multitrack-audio" size={15} color="#6B7280" />
          <Text
            style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 10 })}
          >
            32 Opinions
          </Text>
        </View>
      </View>
    );
  };

  const ClashesCard = ({}) => {
    return (
      <View style={styles.clashesCardCont}>
        <Text style={styles.clashesCardTitle}>
          “The Jan 6 Commission is a fraud”
        </Text>
        <View style={styles.clashesCardUsersCont}>
          <ClashUserCard />
          <ClashUserCard />
        </View>
        <CardFooter />
      </View>
    );
  };

  return <ClashesCard />;
};

export default DualClashCard;
