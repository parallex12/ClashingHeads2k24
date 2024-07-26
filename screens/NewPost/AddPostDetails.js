import {
  ActivityIndicator,
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
import { useEffect, useRef, useState } from "react";
import { font } from "../../styles/Global/main";
import StandardButton from "../../globalComponents/StandardButton";
import { getPercent, postprivacyoptions } from "../../middleware";
import StandardHeader2 from "../../globalComponents/StandardHeader2/StandardHeader2";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  home_posts,
  screen_loader,
  user_auth,
  user_db_details,
} from "../../state-management/atoms/atoms";
import { createPost, validate_post_details } from "../../middleware/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthUser,
  selectIsAuth,
} from "../../state-management/features/auth";
import {
  startLoading,
  stopLoading,
} from "../../state-management/features/screen_loader/loaderSlice";
import { serializeTimestamp, setForm } from "../../utils";
import { setPosts } from "../../state-management/features/posts/postSlice";
import { selectPosts } from "../../state-management/features/posts";
import { Image as ImageCompress } from "react-native-compressor";
import PrivacyBottomSheet from "./components/PrivacyBottomSheet";
import { Blurhash } from "react-native-blurhash";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
const AddPostDetails = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const userAuth = useSelector(selectIsAuth);
  const [imageHashingLoad, setimageHashingLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const user_profile = useSelector(selectAuthUser);
  const posts = useSelector(selectPosts);
  const privacybottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const news_post = useRoute().params?.news_post;

  const [postForm, setPostForm] = useState({
    recording: props?.route?.params?.recording,
    post_image: null,
    createdAt: new Date().toISOString(),
    author: user_profile?.id,
    reactions: {},
    likes: 0,
    dislikes: 0,
    clashes: 0,
    privacy: null,
    post_image_hash: null,
    postReference: "original",
  });

  useEffect(() => {
    if (news_post) {
      setPostForm((prev) => {
        return {
          ...prev,
          title: news_post?.title,
          description: news_post?.description,
          post_image: news_post?.urlToImage,
          createdAt: new Date().toISOString(),
          author: user_profile?.id,
          newsAuthor: news_post?.author,
          postReference: "news",
          newsUrl: news_post?.url,
        };
      });
    }
  }, [news_post]);

  useEffect(() => {
    if (postForm?.post_image && !postForm?.post_image_hash) {
      const convertToblurhash = async () => {
        setimageHashingLoad(true);
        let _hash = await Blurhash.encode(postForm?.post_image, 4, 3);
        setPostForm((prev) => {
          return {
            ...prev,
            post_image_hash: _hash,
          };
        });
        console.log("hash Added");
        setimageHashingLoad(false);
      };
      convertToblurhash();
    }
  }, [postForm?.post_image]);

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
    if (postForm?.post_image && !postForm?.post_image_hash) {
      return alert("Processing media.");
    }
    validate_post_details(postForm)
      .then(async (res) => {
        setLoading(true);
        if (res.code == 200) {
          createPost(postForm)
            .then((res) => {
              console.log("NP", res);
              let updatedPosts = [...posts?.data];
              updatedPosts.push(res?.post_data);
              dispatch(setPosts(updatedPosts));
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
            <Text style={font(13, "#000000", "Medium")}>
              Upload Photo/Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.privacyBtn}
            onPress={() => privacybottomSheetRef.current.present()}
          >
            {postprivacyoptions[postForm?.privacy]?.icon}
            <Text
              style={font(12, "#111827", "Medium", 10, null, {
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
    </View>
  );
};

export default AddPostDetails;
