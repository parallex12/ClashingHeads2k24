import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { HeaderStyles as _styles } from "../../../styles/ChatScreen/main";
import Profile from "../../../globalComponents/StandardHeader/components/Profile";
import BackButton from "../../../globalComponents/BackButton";
import { getPercent } from "../../../middleware";
import { Facebook, Instagram } from "react-content-loader/native";
import ContentLoader from "react-content-loader";

const Header = (props) => {
  let { data, rightIcon, containerStyles, loading } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.col1}>
        <BackButton color="#fff" />
        <Profile
          data={data}
          source={data?.profile_photo}
          profile_hash={data?.profile_hash}
          customStyles={{
            width: getPercent(4.4, height),
            height: getPercent(4.4, height),
          }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{data?.realName}</Text>
          <Text style={styles.status}>@{data?.username}</Text>
        </View>
      </View>
      <View style={styles.col3}>{rightIcon && rightIcon}</View>
    </View>
  );
};

export default Header;
