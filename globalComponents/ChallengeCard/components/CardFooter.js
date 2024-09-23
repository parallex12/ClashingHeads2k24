import React, {
  useEffect,
  useState,
  useCallback,
  memo,
  useContext,
} from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ChallengeCardStyles as _styles } from "../../../styles/Global/main";
import { font } from "../../../styles/Global/main";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  Entypo,
} from "@expo/vector-icons";
import { getPercent } from "../../../middleware";
import FlagReportSheetContext from "../../BottomSheet/FlagReportSheetProvider";
import { rms } from "../../../utils/responsiveSizing";

const CardFooter = memo((data) => {
  let { votes, status, clashes, onClashesPress, onShareApp } = data;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const { showBottomSheet } = useContext(FlagReportSheetContext);
  return (
    <View style={styles.cardFooterWrapper}>
      <View style={styles.cardFooterItem}>
        <FontAwesome6 name="users" size={rms(12)} color="#6B7280" />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 5 })}
        >
          {Object.keys(votes || {})?.length} Voted
        </Text>
      </View>
      <TouchableOpacity
        style={styles.cardFooterItem}
        onPress={() =>
          status == "pending"
            ? alert("Clash has not started yet. Awaiting approvals.")
            : onClashesPress(data)
        }
      >
        <MaterialIcons name="multitrack-audio" size={rms(15)} color="#6B7280" />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 5 })}
        >
          {clashes?.length} Opinions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardFooterItem} onPress={showBottomSheet}>
        <Image
          source={require("../../../assets/icons/post_cards/flag.png")}
          resizeMode="contain"
          style={{ width: getPercent(4, width), height: getPercent(4, width) }}
        />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 5 })}
        >
          Report
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cardFooterItem}
        onPress={() => onShareApp()}
      >
        <Image
          source={require("../../../assets/icons/post_cards/share.png")}
          resizeMode="contain"
          style={{ width: getPercent(4, width), height: getPercent(4, width) }}
        />
        <Text
          style={font(12, "#6B7280", "Regular", 0, null, { marginLeft: 5 })}
        >
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default CardFooter;
