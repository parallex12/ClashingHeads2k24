import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { TypingComponentstyles as _styles } from "../../../styles/Global/main";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { getPercent } from "../../../middleware";
import { useState } from "react";

const TypingComponent = (props) => {
  let { onSend } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [newMessage, setNewMessage] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionWrapper}>
        <Feather
          name="paperclip"
          size={getPercent(2.2, height)}
          color="#6B7280"
        />
      </TouchableOpacity>
      <View style={styles.inputWrapper}>
        <TextInput
          value={newMessage}
          multiline
          placeholderTextColor="#9CA3AF"
          placeholder="Type here.."
          style={styles.input}
          onChangeText={(val) => setNewMessage(val)}
        />
      </View>
      <TouchableOpacity
        style={styles.actionWrapper}
        onPress={() => {
          onSend(newMessage);
          setNewMessage(null);
        }}
      >
        <FontAwesome
          name="send"
          size={getPercent(2.5, height)}
          color="#6B7280"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TypingComponent;
