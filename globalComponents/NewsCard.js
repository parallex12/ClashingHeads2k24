import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { NewsCardStyles, font } from "../styles/Global/main";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import FastImage from "react-native-fast-image";
import { rms } from "../utils/responsiveSizing";

const CardFooter = ({ publishedAt, urlToImage, source }) => {
  let { width, height } = useWindowDimensions();
  let styles = NewsCardStyles({ width, height });
  return (
    <View style={styles.cardFooterWrapper}>
      <View style={styles.cardFootercompanyLogo}>
        <FastImage
          source={{
            uri: urlToImage,
            priority: FastImage.priority.normal,
          }}
          resizeMode="cover"
          defaultSource={require("../assets/icon.png")}
          style={{
            width: rms(25),
            height: rms(25),
            borderRadius: 100,
            marginRight: rms(5),
          }}
        />
        <Text style={font(13, "#6B7287", "Regular")}>{source?.name}</Text>
      </View>
      <Text style={font(15, "#6B7287", "Regular")}>
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

  const handlePress = async () => {
    if (data?.url) {
      await WebBrowser.openBrowserAsync(data?.url, {
        presentationStyle: "currentContext", // Use PAGE_SHEET presentation style
        enableBarCollapsing: true,
        readerMode: true,
      });
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  };

  const onMicPress = () => {
    navigation.navigate("AddPostDetails", { news_post: data });
  };

  return (
    <Pressable style={styles.newsCardCont} onPress={handlePress}>
      <View style={styles.cardRow}>
        <View style={styles.newsCardThumbnailCont}>
          <FastImage
            source={{
              uri: data?.urlToImage,
              priority: FastImage.priority.normal,
            }}
            defaultSource={require("../assets/icon.png")}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.newsContentWrapper}>
          <Text style={font(15, "#000000", "Semibold", 3, 0, { width: "88%" })}>
            {data?.title}
          </Text>
          <Text style={font(12.5, "#000000", "Regular", 3)}>
            {data?.description}
          </Text>
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
