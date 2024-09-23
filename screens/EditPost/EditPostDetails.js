import {
  ActivityIndicator,
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
import { useEffect, useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { getPercent, postprivacyoptions } from "../../middleware";
import StandardHeader2 from "../../globalComponents/StandardHeader2/StandardHeader2";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { Image as ImageCompress } from "react-native-compressor";
import PrivacyBottomSheet from "./components/PrivacyBottomSheet";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import UpdatedVoiceRecorderBottomSheet from "../../globalComponents/UpdatedVoiceRecorderBottomSheet/UpdatedVoiceRecorderBottomSheet";
import WaveAudioPlayer from "../../globalComponents/WaveAudioPlayer";
import FindUserSheet from "./components/FindUserSheet";
import ChallengeHeader from "./components/ChallengeHeader";
import PostApi from "../../ApisManager/PostApi";
import useUserProfile from "../../Hooks/useUserProfile";
import { validate_post_details } from "../../utils/validators";

const EditPostDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [imageHashingLoad, setimageHashingLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;
  const [tempOpponent, setTempOpponent] = useState(null);
  const privacybottomSheetRef = useRef(null);
  const friendsbottomSheetRef = useRef(null);
  const voicebottomSheetRef = useRef(null);
  const edit_post = useRoute().params?.edit_post;
  const [postForm, setPostForm] = useState();
  const postApi = new PostApi();

  useEffect(() => {
    if (edit_post) {
      setPostForm(edit_post);
    }
  }, [edit_post]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.2,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;
      const compressResult = await ImageCompress.compress(uri, {
        compressionMethod: "manual",
        quality: 0.1,
        downloadProgress: (pres) => console.log(pres),
      });
      setPostForm((prev) => {
        return {
          ...prev,
          post_image: compressResult,
        };
      });
    }
  };

  const onPost = async () => {
    await validate_post_details(postForm)
      .then(async (res) => {
        setLoading(true);
        if (res.code == 200) {
          await postApi
            .updatePostById(edit_post?._id, postForm)
            .then((res) => {
              props?.navigation.navigate("Home");
              setLoading(false);
            })
            .catch((e) => {
              setLoading(false);
              console.log(e);
              alert("Something Went wrong!.");
            });
        }
      })
      .catch((e) => {
        setLoading(false);
        alert(e?.msg);
      });
  };

  const onRecordingReset = () => {
    setPostForm((prev) => {
      return { ...prev, recording: null };
    });
  };

  const onVoiceUpdate = (audioData) => {
    setPostForm((prev) => {
      return { ...prev, recording: audioData?.recording };
    });
  };
  const onOpponent = (user) => {
    setPostForm((prev) => {
      return { ...prev, opponent: user?._id, clashType: "challenge" };
    });
    setTempOpponent(user);
  };

  return (
    <View style={styles.container}>
      <StandardHeader2
        containerStyles={{ height: getPercent(12, height) }}
        backButton
        title="Edit Clash"
        searchIcon={false}
        rightIcon={
          <StandardButton
            title="Update"
            loading={loading}
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
              onChangeText={(val) =>
                setPostForm((prev) => {
                  return { ...prev, title: val };
                })
              }
              value={postForm?.title}
            />
          </View>
          <View style={styles.postInputWrapper}>
            <TextInput
              placeholder="Describe your post in detail... What do you want to share?"
              placeholderTextColor="#6B7280"
              style={styles.postInput}
              multiline
              onChangeText={(val) =>
                setPostForm((prev) => {
                  return { ...prev, description: val };
                })
              }
              value={postForm?.description}
            />
          </View>
          <TouchableOpacity
            style={styles.challengeBtn}
            onPress={() => friendsbottomSheetRef.current.present()}
          >
            {postprivacyoptions[1]?.icon}
            <Text
              style={font(15, "#111827", "Medium", 10, null, {
                marginHorizontal: 5,
              })}
            >
              Challenge anyone
            </Text>
            <AntDesign
              name="caretdown"
              size={12}
              color="#111827"
              style={{
                marginLeft: 8,
              }}
            />
          </TouchableOpacity>
          {postForm?.clashType == "challenge" && (
            <ChallengeHeader
              data={{
                challenger: currentUser,
                opponent: tempOpponent,
                title: postForm?.title,
              }}
            />
          )}
          <View style={styles.mediaWrapper}>
            <View style={styles.imageActionsWrapper}>
              <StandardButton
                title={
                  imageHashingLoad ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Entypo name="cross" size={24} color="#fff" />
                  )
                }
                customStyles={styles.imageActionsItem}
                onPress={() => {
                  setPostForm((prev) => {
                    return { ...prev, post_image: null, post_image_hash: null };
                  });
                }}
              />
            </View>
            {postForm?.post_image && (
              <Image
                source={{ uri: postForm?.post_image }}
                style={styles.mediaImg}
              />
            )}
          </View>
          {postForm?.recording && (
            <WaveAudioPlayer
              source={postForm?.recording}
              audioResetBtn
              audioResetFunc={onRecordingReset}
              localAudio
            />
          )}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "height"}
      >
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
            <Text style={font(15, "#000000", "Medium")}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recordBtn}
            onPress={() => voicebottomSheetRef.current.present()}
          >
            <Image
              source={require("../../assets/images/mic_rec.png")}
              resizeMode="contain"
              style={{
                width: "75%",
                height: "75%",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.privacyBtn}
            onPress={() => privacybottomSheetRef.current.present()}
          >
            {postprivacyoptions[postForm?.privacy]?.icon}
            <Text
              style={font(15, "#111827", "Medium", 10, null, {
                marginHorizontal: 5,
              })}
            >
              {postprivacyoptions[postForm?.privacy]?.label}
            </Text>
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
      <PrivacyBottomSheet
        setPostForm={setPostForm}
        postForm={postForm}
        bottomSheetRef={privacybottomSheetRef}
      />

      <FindUserSheet
        callBackUser={onOpponent}
        bottomSheetRef={friendsbottomSheetRef}
      />
      <UpdatedVoiceRecorderBottomSheet
        postId={null}
        clashTo={null}
        onPostClash={onVoiceUpdate}
        bottomVoiceSheetRef={voicebottomSheetRef}
        postBtnTitle="Confirm"
      />
    </View>
  );
};

export default EditPostDetails;
