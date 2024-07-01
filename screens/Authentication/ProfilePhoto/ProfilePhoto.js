import {
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
import { connect, useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/ProfilePhoto/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  registrationForm,
  screen_loader,
  user_auth,
} from "../../../state-management/atoms/atoms";
import * as ImagePicker from "expo-image-picker";
import { update_user_details, uploadMedia } from "../../../middleware/firebase";
import auth from "@react-native-firebase/auth";
import {
  startLoading,
  stopLoading,
} from "../../../state-management/features/screen_loader/loaderSlice";
import { selectUserForm } from "../../../state-management/features/auth";
import { Image as ImageCompress } from "react-native-compressor";

const ProfilePhoto = (props) => {
  let { route } = props;
  let { prevData } = { name: "ella" };
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const userform = useSelector(selectUserForm);
  const [form, setForm] = useState(userform);
  const [profile, setProfile] = useState(null);
  const user = auth().currentUser;
  const dispatch = useDispatch();

  const onContinue = async () => {
    try {
      if (profile) {
        dispatch(startLoading());
        await uploadMedia(profile, "userProfiles")
          .then((res) => {
            if (res.url) {
              let data = { hasProfilePhoto: true, profile_photo: res?.url };
              update_user_details(user?.uid, data).then((res) => {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
                if (res?.code == 200) {
                  props?.navigation?.navigate("Home");
                }
                dispatch(stopLoading());
              });
            }
          })
          .catch((e) => {
            console.log(e);
            dispatch(stopLoading());
          });
      }
    } catch (error) {
      dispatch(stopLoading());
      console.log("Error stopping recording:", error);
    }
  };

  // Ask for permission on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    if (!result.canceled) {
      let uri = result.assets[0].uri;
      const compressResult = await ImageCompress.compress(uri, {
        compressionMethod: "manual",
        quality: 0.1,
        downloadProgress:((pres)=>console.log(pres))
      });
      console.log("result", compressResult, uri);
      setProfile(compressResult);
      setForm((prev) => {
        return { ...prev, profile: compressResult };
      });
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        let uri = result.assets[0].uri;
        setProfile(uri);
        setForm((prev) => {
          return { ...prev, profile: uri };
        });
      }
    } catch (error) {
      console.error("Error opening camera:", error);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.headerActionWrapper}>
            <BackButton />
            {/* <TouchableOpacity onPress={onContinue}>
              <Text style={font(14, "#000000", "Medium", 3)}>Skip</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.formWrapper}>
            <Text style={font(20, "#120D26", "Semibold", 3)}>
              Profile photo
            </Text>
            <Text style={font(12, "#4B5563", "Regular", 7)}>
              Upload or capture your real profile photo
            </Text>
            <View style={styles.profileCont}>
              <View style={styles.profileWrapper}>
                <Image
                  source={
                    profile
                      ? { uri: profile }
                      : require("../../../assets/icons/profile_photo_icon.png")
                  }
                  resizeMode="stretch"
                  style={styles.profile}
                />
              </View>
            </View>
            <View style={styles.continueBtnWrapper}>
              {profile && (
                <StandardButton
                  title="Continue"
                  customStyles={styles.upload_btn}
                  onPress={onContinue}
                />
              )}
            </View>
          </View>
          <View style={styles.actionWrapper}>
            <StandardButton
              title="Take a Photo"
              customStyles={styles.take_a_photo_btn}
              onPress={takePhoto}
              textStyles={{ color: "#DB2727" }}
            />
            <StandardButton
              title="Upload Photo"
              customStyles={styles.upload_btn}
              onPress={pickImage}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfilePhoto;
