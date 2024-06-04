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
import { useRecoilState, useRecoilValue } from "recoil";
import { screen_loader, user_auth } from "../../state-management/atoms/atoms";
import { createPost, validate_post_details } from "../../middleware/firebase";

const AddPostDetails = (props) => {
  let { } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const [postImage, setPostImage] = useState(null);
  const userAuth = useRecoilValue(user_auth);
  const [loading, setLoading] = useRecoilState(screen_loader)
  const [postForm, setPostForm] = useState({
    recording: props?.route?.params?.recording,
    post_image: postImage,
    createdAt: new Date(),
    author: userAuth?.uid
  })
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


  const onPost = async () => {
    setLoading(true)
    validate_post_details(postForm)
      .then((res) => {
        if (res.code == 200) {
          createPost(postForm)
            .then(() => {
              props?.navigation.navigate("Home")
              setLoading(false)
            })
            .catch((e) => {
              setLoading(false)
              alert("Something Went wrong!.")
            })
        }
      })
      .catch((e) => {
        setLoading(false)
        alert(e?.msg)
      })
  }

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
            onPress={onPost}
          />
        }
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.postInputWrapper}>
            <TextInput
              placeholder="Enter a captivating title for your post..."
              placeholderTextColor="#6B7280"
              style={styles.postInput}
              multiline
              onChangeText={(val) => setPostForm((prev) => {
                return { ...prev, title: val };
              })}
            />
          </View>
          <View style={styles.postInputWrapper}>
            <TextInput
              placeholder="Describe your post in detail... What do you want to share?"
              placeholderTextColor="#6B7280"
              style={styles.postInput}
              multiline
              onChangeText={(val) => setPostForm((prev) => {
                return { ...prev, description: val };
              })}
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
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
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
