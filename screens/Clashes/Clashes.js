import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Clashes/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import ClashCard from "./components/ClashCard";
import { useNavigation } from "@react-navigation/native";

const Clashes = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StandardHeader searchIcon profile logo />
      <ScrollView>
        <View style={styles.content}>
          {/* Header  here */}
          <View style={styles.contentHeaderWrapper}>
            <Text style={font(14, "#111827", "Semibold")}>
              102 Live Clashes
            </Text>
            <View style={styles.contectActionsWrapper}>
              <TouchableOpacity style={styles.contentCalenderBtn}>
                <Image
                  source={require("../../assets/icons/calendar.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contentCreateBtn}>
                <Text style={font(13, "#FFFFFF", "Semibold")}>
                  Create Clash
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Clash cards here */}
          <View style={styles.cardsWrapper}>
            {new Array(10).fill("").map((item, index) => {
              return (
                <ClashCard
                  onCardPress={() => navigation.navigate("ClashRoom")}
                  active={index == 0}
                  is_featured={index == 0}
                  is_public={index % 2 == 0}
                  is_private={index % 2 == 1}
                  key={index}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default Clashes;
