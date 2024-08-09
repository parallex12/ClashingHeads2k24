import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecieverMessagestyles as _styles } from "../../../styles/Global/main";
import { formatTime, getPercent } from "../../../middleware";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import ImageViewer from "../../../globalComponents/ImageViewer/ImageViewer";
import WaveAudioPlayer from "../../../globalComponents/WaveAudioPlayer";

const RecieverMessage = (props) => {
  let { data } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let time = formatTime(data?.createdAt);
  let { media } = data;
  let expandWidth = { width: getPercent(65, width) };
  let msgBg = {
    backgroundColor:
      data?.message?.length > 0 || media?.image ? "#DB2727" : "rgba(0,0,0,0.3)",
  };

  return (
    <View style={styles.mainCont}>
      <View style={[styles.container, msgBg, media ? expandWidth : null]}>
        {media?.image && (
          <View style={styles.mediaWrapper}>
            <ImageViewer
              source={{ uri: media?.image }}
              style={styles.mediaImg}
            />
          </View>
        )}
        {media?.audio && <WaveAudioPlayer source={media?.audio} />}
        {data?.message?.length > 0 && (
          <Text style={styles.text}>{data?.message}</Text>
        )}
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default RecieverMessage;
