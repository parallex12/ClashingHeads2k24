import {
  Image,
  Pressable,
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
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

const NewsCard = (props) => {
  let { data, customStyles, placeholder } = props;
  let { width, height } = useWindowDimensions();
  let styles = NewsCardStyles({ width, height });
  let navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  let { author, description, url, urlToImage, title, publishedAt, source } =
    data;

  const CardFooter = () => {
    return (
      <View style={styles.cardFooterWrapper}>
        <View style={styles.cardFootercompanyLogo}>
          <Image
            source={
              urlToImage ? { uri: urlToImage } : require("../assets/icon.png")
            }
            resizeMode="cover"
            style={styles.companyLogo}
          />
          <Text style={font(13, "#6B7287", "Regular")}>{source?.name}</Text>
        </View>
        <Text style={font(12, "#6B7287", "Regular")}>
          {publishedAt && new Date(publishedAt).toDateString()}
        </Text>
      </View>
    );
  };

  const handlePress = async () => {
    if (data.url) {
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: "popover", // Use PAGE_SHEET presentation style
      });
    }
  };

  const onMicPress = () => {
    navigation.navigate("NewPost", { news_post: data });
  };

  return (
    <Pressable style={styles.newsCardCont} onPress={handlePress}>
      <View style={styles.cardRow}>
        <View style={styles.newsCardThumbnailCont}>
          <Image
            source={
              loading
                ? require("../assets/icon.png")
                : urlToImage
                ? { uri: urlToImage }
                : require("../assets/icon.png")
            }
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setLoading(false)}
          />
        </View>
        <View style={styles.newsContentWrapper}>
          <Text style={font(15, "#000000", "Semibold", 3, 0, { width: "88%" })}>
            {title}
          </Text>
          <Text style={font(12.5, "#000000", "Regular", 3)}>{description}</Text>
          <TouchableOpacity style={styles.micWrapper} onPress={onMicPress}>
            <Image
              source={require("../assets/images/mic_rec.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CardFooter />
    </Pressable>
  );
};

export default NewsCard;
