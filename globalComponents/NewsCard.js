import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { NewsCardStyles, font } from "../styles/Global/main";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const NewsCard = (props) => {
  let { customStyles, placeholder } = props;
  let { width, height } = useWindowDimensions();
  let styles = NewsCardStyles({ width, height });
  let navigation = useNavigation();

  const CardFooter = () => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFootercompanyLogo}>
          <Image
            source={require("../assets/icon.png")}
            resizeMode="cover"
            style={styles.companyLogo}
          />
          <Text style={font(13, "#6B7287", "Regular")}>bbc.com</Text>
        </View>
        <Text style={font(12, "#6B7287", "Regular")}>Tue 14 Apr 9:36 PM</Text>
      </View>
    );
  };

  return (
    <View style={styles.newsCardCont}>
      <View style={styles.cardRow}>
        <View style={styles.newsCardThumbnailCont}>
          <Image
            source={require("../assets/stickers/1.jpg")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.newsContentWrapper}>
          <Text style={font(15, "#000000", "Semibold", 3)}>
            This is demo headings
          </Text>
          <Text style={font(12.5, "#000000", "Regular", 3)}>
            Lorem ipsum dolor sit amet. Sit conse quatur quibusdam aut illum
            minima et facilis rerum eos aliquam quia volupta tem et placeat
            voluptatibus.
          </Text>
        </View>
      </View>
      <CardFooter />
    </View>
  );
};

export default NewsCard;
