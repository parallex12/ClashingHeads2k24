import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { connect } from "react-redux";
import { EmptyBoxStyles } from "../styles/Global/main";
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

const EmptyBox = (props) => {
    let { text, icon } = props;
    let { width, height } = useWindowDimensions();
    let styles = EmptyBoxStyles({ width, height });
    let navigation = useNavigation()

    return (
        <View style={[styles.container]}
        >
            <FontAwesome6 name="frown" size={RFValue(50)} color="black" />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default EmptyBox