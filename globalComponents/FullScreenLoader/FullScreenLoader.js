import { Image, Text, View, useWindowDimensions } from "react-native";
import { FullScreenLoaderStyles } from "../../styles/Global/main";
import { getPercent } from "../../middleware";
import * as Animatable from "react-native-animatable";
import { useEffect } from "react";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { useDispatch } from "react-redux";

const FullScreenLoader = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = FullScreenLoaderStyles({ width, height });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onUpdateBottomSheet(1));
    return () => dispatch(onUpdateBottomSheet(null));
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default FullScreenLoader;
