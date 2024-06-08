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
import { Keyboard } from "react-native";
import { useSelector } from "react-redux";
import { isAppLoading } from "../../state-management/features/screen_loader";
import { getPercent } from "../../middleware";
import Svg, { Path } from "react-native-svg";
import * as Animatable from "react-native-animatable";

const FullScreenLoader = (props) => {
  const loading = useSelector(isAppLoading);
  let { width, height } = useWindowDimensions();
  let styles = FullScreenLoaderStyles({ width, height });
  const [paths, setPaths] = useState([-width, 0, width]);
  const slideAnim = useRef(new Animated.Value(paths[0])).current;

  useEffect(() => {
    if (loading == "default") {
      return;
    }
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
        source={require("../../assets/logo.png")}
        style={{ width: getPercent(50, width), height: getPercent(10, height) }}
        resizeMode="contain"
      />
      <View style={styles.titleWrapper}>
        <Animatable.Text
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={styles.title}
        >
          CLASHING HEADS
        </Animatable.Text>
      </View>
      <Text style={styles.slug}>(Patent Pending) (Beta Version 1.0)</Text>
    </Animated.View>
  );
};

export default FullScreenLoader;
