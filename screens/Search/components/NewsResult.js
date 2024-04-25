import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { font } from "../../../styles/Global/main";
import { NewsResultStyles as _styles } from "../../../styles/Search/main";
import { Image } from "react-native";

const NewsResult = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const CardFooter = () => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFootercompanyLogo}>
          <Image
            source={require("../../../assets/icon.png")}
            resizeMode="cover"
            style={styles.companyLogo}
          />
          <Text style={font(13, "#6B7287", "Regular")}>bbc.com</Text>
        </View>
        <Text style={font(12, "#6B7287", "Regular")}>Tue 14 Apr 9:36 PM</Text>
      </View>
    );
  };

  const NewsCard = ({}) => {
    return (
      <View style={styles.newsCardCont}>
        <View style={styles.cardRow}>
          <View style={styles.newsCardThumbnailCont}>
            <Image
              source={require("../../../assets/stickers/1.jpg")}
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

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <MaterialCommunityIcons name="fire" size={24} color="#4B4EFC" />
        <Text style={font(14, "#111827", "Medium")}>Trending News</Text>
      </View>
      {[1, 2, 3, 4]?.map((item, index) => {
        return <NewsCard key={index} />;
      })}
    </View>
  );
};

export default NewsResult;
