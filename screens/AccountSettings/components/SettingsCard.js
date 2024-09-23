import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SettingsCardStyles as _styles } from "../../../styles/AccountSettings/main";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { rms } from "../../../utils/responsiveSizing";

const SettingsCard = (props) => {
  let { data, onDeleteAccount } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();

  const onItemPress = () => {
    if (data?.route) {
      navigation?.navigate(data?.route);
      return;
    }
    if (data?.label == "Delete Account") {
      onDeleteAccount();
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onItemPress}>
      {data?.icon && (
        <View style={styles.iconWrapper}>
          <Image
            source={data?.icon}
            resizeMode="contain"
            style={{ width: "80%", height: "80%" }}
          />
        </View>
      )}
      <Text style={styles.title}>{data?.label}</Text>
      <View style={styles.rightChevronBtn}>
        <Entypo name="chevron-right" size={rms(14)} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsCard;
