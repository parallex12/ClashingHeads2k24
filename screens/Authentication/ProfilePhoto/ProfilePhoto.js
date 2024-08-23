import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/ProfilePhoto/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import BackButton from "../../../globalComponents/BackButton";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadMedia } from "../../../middleware/firebase";
import { Image as ImageCompress } from "react-native-compressor";
import UserApi from "../../../ApisManager/UserApi";
import useUserProfile from "../../../Hooks/useUserProfile";
import { useQueryClient } from "react-query";
import { useAuth } from "../../../ContextProviders/AuthProvider";

const ProfilePhoto = (props) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userProfile = useUserProfile();
  const userApi = new UserApi();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const current_user = userDataCached?.user;
  const { logout } = useAuth();

  const onContinue = async () => {
    try {
      if (profile) {
        setLoading(true);
        await uploadMedia(profile, "userProfiles")
          .then(async (res) => {
            if (res.url) {
              let data = {
                hasProfilePhoto: true,
                profile_photo: res?.url,
              };
              const result = await userApi.updateUserProfile(
                current_user?._id,
                data
              );
              let user = result?.user;
              await queryClient.invalidateQueries({
                queryKey: ["currentUserProfile"],
                stale: true,
                refetchPage: true,
                exact: true,
              });
              queryClient.setQueryData("currentUserProfile", {
                user: result?.user,
              });
              await userProfile.refetch();

              if (user) {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
                setLoading(false);
              }
            }
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
            logout();
          });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error stopping recording:", error);
      logout();
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
            <Text style={font(25, "#120D26", "Semibold", 3)}>
              Profile photo
            </Text>
            <Text style={font(16, "#4B5563", "Regular", 4)}>
              Upload or capture your real profile photo
            </Text>
            <View style={styles.profileCont}>
              <View style={styles.profileWrapper}>
                <Image
                  defaultSource={require("../../../assets/icons/profile_photo_icon.png")}
                  source={{
                    uri: profile || userProfile?.data?.user?.profile_photo,
                  }}
                  resizeMode="stretch"
                  style={styles.profile}
                />
              </View>
            </View>
            <View style={styles.continueBtnWrapper}>
              {profile && (
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
