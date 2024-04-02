import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { BottomActionsMenu as _styles } from "../../../styles/ClashRoom/main";
import { font } from "../../../styles/Global/main";
import { getPercent } from "../../../middleware";

const BottomActionsMenu = (props) => {
  let { data, index } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  let actionsMenu = [
    {
      icon: require("../../../assets/ClashRoomIcons/mic.png"),
      onPress: null,
    },
    {
      icon: require("../../../assets/ClashRoomIcons/five.png"),
      onPress: null,
    },
    {
      icon: require("../../../assets/ClashRoomIcons/smile.png"),
      onPress: null,
    },
    {
      icon: require("../../../assets/ClashRoomIcons/people.png"),
      onPress: null,
    },
    {
      icon: require("../../../assets/ClashRoomIcons/cogs.png"),
      onPress: null,
    },
  ];

  const MenuItem = ({ data }) => {
    return (
      <TouchableOpacity style={styles.MenuItemWrapper}>
        <Image
          source={data?.icon}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuActionsWrapper}>
        {actionsMenu?.map((item, index) => {
          return <MenuItem key={index} data={item} />;
        })}
      </View>
      <TouchableOpacity style={styles.leaveRoomBtn}>
       <Text style={font(12,"#DB2727","Semibold")}>Leave Room</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionsMenu;
