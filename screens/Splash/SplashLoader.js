import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/SplashLoader/main";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { getFirestoreDoc } from "../../middleware/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../utils";

const SplashLoader = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let user = auth().currentUser;

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    getFirestoreDoc("Users", "YM6ibHR1XZEYAx6jokpD");
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
