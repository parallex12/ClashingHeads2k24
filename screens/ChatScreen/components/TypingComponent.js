import {
  Image,
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
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image as ImageCompress } from "react-native-compressor";
import TypingComponentExtraViewer from "./TypingComponentExtraViewer";
import UpdatedVoiceRecorderBottomSheet from "../../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";

const TypingComponent = (props) => {
  let { onSend, media, setMedia, voicebottomSheetRef } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [newMessage, setNewMessage] = useState("");
  const [viewHeight, setViewHeight] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
      presentationStyle: "currentContext",
    });
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      const compressResult = await ImageCompress.compress(uri, {
        compressionMethod: "auto",
        quality: 0.1,
      });
      setMedia((prev) => ({ ...prev, image: compressResult }));
    }
  };

  const removeImage = (key) => {
    setMedia((prev) => {
      const { [key]: removed, ...rest } = prev; // Destructure to remove the key
      return rest; // Return the updated object without the removed key
    });
  };

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height); // Set the height of the view
  };

  const onSendMsg = () => {
    onSend({ newMessage, media });
    setNewMessage(null);
    setMedia({});
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {Object.values(media)?.length > 0 && (
        <TypingComponentExtraViewer
          data={media}
          onDeleteMedia={removeImage}
          viewHeight={viewHeight}
        />
      )}
      <View style={styles.innercontainer}>
        <TouchableOpacity style={styles.actionWrapper} onPress={pickImage}>
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
          <TouchableOpacity
            style={styles.recordBtn}
            onPress={() => voicebottomSheetRef.current.present()}
          >
            <Image
              source={require("../../../assets/images/mic_rec.png")}
              resizeMode="contain"
              style={{
                width: "75%",
                height: "75%",
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionWrapper} onPress={onSendMsg}>
          <FontAwesome
            name="send"
            size={getPercent(2.5, height)}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TypingComponent;
