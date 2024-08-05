import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { NewsCardStyles, font } from "../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

const CardFooter = ({ publishedAt, urlToImage, source }) => {
  let { width, height } = useWindowDimensions();
  let styles = NewsCardStyles({ width, height });
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

const NewsCard = (props) => {
  let { data, customStyles, placeholder } = props;
  let { width, height } = useWindowDimensions();
  let styles = NewsCardStyles({ width, height });
  let navigation = useNavigation();

  let { description, url, urlToImage, title } = data;

  const handlePress = async () => {
    if (data.url) {
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: "popover", // Use PAGE_SHEET presentation style
      });
    }
  };

  const onMicPress = () => {
    navigation.navigate("AddPostDetails", { news_post: data });
  };

  return (
    <Pressable style={styles.newsCardCont} onPress={handlePress}>
      <View style={styles.cardRow}>
        <View style={styles.newsCardThumbnailCont}>
          <Image
            source={
              urlToImage ? { uri: urlToImage } : require("../assets/icon.png")
            }
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
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
      <CardFooter {...data} />
    </Pressable>
  );
};

export default NewsCard;
