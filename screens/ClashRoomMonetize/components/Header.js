import { Text, View, useWindowDimensions } from "react-native";
import { HeaderStyles as _styles } from "../../../styles/CreateRoom/main";
import BackButton from "../../../globalComponents/BackButton";
import { font } from "../../../styles/Global/main";

const Header = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <BackButton customStyles={{ alignSelf: "center", flex: 0.5 }} />
      <Text style={font(17, "#111827", "Semibold")}>ClashRoom Monetization</Text>
    </View>
  );
};

export default Header;
