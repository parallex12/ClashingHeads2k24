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
import { Blurhash } from "react-native-blurhash";

const ProfilePhoto = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [profile, setProfile] = useState(null);
  const [profileHash, setProfileHash] = useState(null);
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);

  const onContinue = async () => {
    try {
      if (profile) {
        setLoading(true);
        await uploadMedia(profile, "userProfiles")
          .then((res) => {
            if (res.url) {
              let data = {
                hasProfilePhoto: true,
                profile_photo: res?.url,
                profile_hash: profileHash,
              };
              update_user_details(user?.uid, data).then((res) => {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
                setLoading(false);
              });
            }
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error stopping recording:", error);
    }
  };

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

  useEffect(() => {
    if (profile) {
      setProfileHash("loading");
      const convertToblurhash = async () => {
        let _hash = await Blurhash.encode(profile, 4, 3);
        console.log(_hash);
        setProfileHash(_hash);
      };
      convertToblurhash();
    }
  }, [profile]);

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
      });
      setProfile(compressResult);
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
                {profileHash == "loading" && (
                  <StandardButton
                    loading={true}
                    customStyles={styles.imageActionsItem}
                  />
                )}
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
              {profile && profileHash != "loading" && (
                <StandardButton
                  loading={loading}
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
