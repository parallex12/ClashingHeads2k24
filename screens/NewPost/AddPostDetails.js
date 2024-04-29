import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { AddPostDetailsStyles as _styles } from "../../styles/NewPost/main";
import { useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { getPercent } from "../../middleware";
import StandardHeader2 from "../../globalComponents/StandardHeader2/StandardHeader2";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AddPostDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const [postImage, setPostImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPostImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <StandardHeader2
        containerStyles={{ height: getPercent(14, height) }}
        backButton
        title="New Post"
        searchIcon={false}
        rightIcon={
          <StandardButton
            title="Post"
            customStyles={{
              width: getPercent(17, width),
              height: getPercent(4, height),
            }}
            onPress={() => props?.navigation?.navigate("Home")}
          />
        }
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.postInputWrapper}>
            <TextInput
              placeholder="Write Post Title..."
              placeholderTextColor="#6B7280"
              style={styles.postInput}
              multiline
            />
          </View>
          <View style={styles.mediaWrapper}>
            {postImage && (
              <Image
                source={postImage}
                style={styles.mediaImg}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS=="ios"?"position":"height"}>
        <View style={styles.postBottomActionsWrapper}>
          <TouchableOpacity style={styles.uploadBtnWrapper} onPress={pickImage}>
            <Image
              source={require("../../assets/icons/galleryColoredIcon.png")}
              resizeMode="contain"
              style={{
                width: getPercent(6, width),
                height: getPercent(6, width),
                marginRight: 5,
              }}
            />
            <Text style={font(13, "#000000", "Medium")}>
              Upload Photo/Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.privacyBtn}>
            <Text style={font(12, "#111827", "Medium", 10)}>Public</Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="#111827"
              style={{
                marginLeft: 8,
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddPostDetails;
