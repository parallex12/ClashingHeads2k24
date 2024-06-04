import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FullScreenLoaderStyles } from "../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "../../state-management/LoaderContext";
import { Keyboard } from "react-native";
import { useRecoilValue } from "recoil";
import { screen_loader, user_auth } from "../../state-management/atoms/atoms";

const FullScreenLoader = (props) => {
  const loading = useRecoilValue(screen_loader);
  let { width, height } = useWindowDimensions();
  let styles = FullScreenLoaderStyles({ width, height });
  const [paths, setPaths] = useState([-width, 0, width]);
  const slideAnim = useRef(new Animated.Value(paths[0])).current;
  const userAuth = useRecoilValue(user_auth);

  useEffect(() => {
    if (!userAuth) return;
    Keyboard.dismiss();
    if (loading) {
      Animated.timing(slideAnim, {
        toValue: paths[1], // Slide in to cover the screen
        duration: 500, // Animation duration
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: paths[2], // Slide out to the right
        duration: 500, // Animation duration
        useNativeDriver: true,
      }).start(() => setPaths(paths.reverse()));
    }
  }, [loading, slideAnim]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
    >
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: width, height: height }}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default FullScreenLoader;
