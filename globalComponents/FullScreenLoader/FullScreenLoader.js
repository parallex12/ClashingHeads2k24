import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { FullScreenLoaderStyles } from "../../styles/Global/main";
import { Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { useLoader } from "../../state-management/LoaderContext";

const FullScreenLoader = (props) => {
    const { loading } = useLoader();
    let { width, height } = useWindowDimensions();
    let styles = FullScreenLoaderStyles({ width, height });
    let navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(width)).current; // Initial position off-screen to the right

    useEffect(() => {
        if (loading) {
            Animated.timing(slideAnim, {
                toValue: 0, // Slide in to cover the screen
                duration: 500, // Animation duration
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -width, // Slide out to the left
                duration: 500, // Animation duration
                useNativeDriver: true,
            }).start();
        }
    }, [loading, slideAnim]);


    return (
        <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
            <Image
                source={require("../../assets/splash.png")}
                style={{ width: width, height: height }}
                resizeMode="cover"
            />
        </Animated.View>
    );
};

export default FullScreenLoader;
