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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";

const ClashesResult = (props) => {
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
        <Text style={font(14, "#000000", "Semibold",3)}>Zeeshan Karim</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>Challenger</Text>
        <WaveAudioPlayer iconSize={15} />
      </View>
    );
  };

  const CardFooter = () => {
    return <View style={styles.cardFooterWrapper}></View>;
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

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending Clashes</Text>
      </View>
      {[1, 2]?.map((item, index) => {
        return <ClashesCard key={index} />;
      })}
    </View>
  );
};

export default ClashesResult;
