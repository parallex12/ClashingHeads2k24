import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  ClashCardStyles as _styles,
  styles,
} from "../../../styles/Clashes/main";
import { font } from "../../../styles/Global/main";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";

const RoomCard = (props) => {
  let { active,onCardPress, is_private, is_featured, is_public } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  const FeaturedBtn = () => {
    return (
      <View style={styles.featuredBtn}>
        <Text style={font(10, "#7375FD", "Medium")}>🔥 Featured</Text>
      </View>
    );
  };

  const PublicBtn = () => {
    return (
      <View style={styles.publicBtn}>
        <Fontisto name="unlocked" size={13} color="#6B7280" />
        <Text
          style={font(11, "#6B7280", "Regular", 0, null, { marginLeft: 7 })}
        >
          Public
        </Text>
      </View>
    );
  };

  const PrivateBtn = () => {
    return (
      <View style={styles.publicBtn}>
        <Fontisto name="locked" size={13} color="#6B7280" />
        <Text
          style={font(11, "#6B7280", "Regular", 0, null, { marginLeft: 7 })}
        >
          Private
        </Text>
      </View>
    );
  };

  const ClashersProfile = ({ style }) => {
    return (
      <View style={style}>
        <Image
          source={require("../../../assets/dummy/dummyProfile2.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: active ? "#7375FD" : "#E5E7EB",
        },
      ]}
      onPress={onCardPress}
    >
      <View style={styles.infoWrapper}>
        <Text style={font(14, "#1C1C1C", "Medium")}>
          Should we eliminate taxes for the wealthy people?
        </Text>
        <View style={styles.infoWrapperRow}>
          {is_featured ? (
            <FeaturedBtn />
          ) : is_public ? (
            <PublicBtn />
          ) : is_private ? (
            <PrivateBtn />
          ) : null}

          <View style={styles.totalClashersWrapper}>
            <FontAwesome6 name="users" size={12} color="#6B7280" />
            <Text
              style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 5 })}
            >
              23 Clashers
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.clashersContainer}>
        <View style={styles.clashersWrapper}>
          {new Array(5).fill().map((item, index) => {
            let conditionalstyles = [
              styles.clasherProfile1,
              styles.clasherProfile2,
              styles.clasherProfile3,
              styles.clasherProfile4,
              styles.clasherProfile5,
            ];
            return (
              <ClashersProfile key={index} style={conditionalstyles[index]} />
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;
