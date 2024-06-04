import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/SplashLoader/main";
import { useEffect } from "react";
import {
  Logout,
  getFirestoreDoc,
  isUserProfileConnected,
} from "../../middleware/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../utils";
import { user_auth } from "../../state-management/atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const SplashLoader = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [userAuth, setUserAuth] = useRecoilState(user_auth);

  useEffect(() => {
    if (userAuth) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      isUserProfileConnected(userAuth?.uid)
        .then((res) => {
          props?.navigation.navigate("Home");
        })
        .catch((e) => {
          if (e == 404) {
            props?.navigation.navigate("CommunityGuidelines");
            return;
          }
          aler("Something Went Wrong!.");
          Logout(setUserAuth);
        });
    } else {
      Logout(setUserAuth);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashLoader;
