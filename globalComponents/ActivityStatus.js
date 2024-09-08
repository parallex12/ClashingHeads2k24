import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useChatSocketService } from "../state-management/apiCalls/ChatSocketService";
import { useState, useEffect } from "react";
import { getPercent } from "../middleware";
import { rms, rs, rvs } from "../utils/responsiveSizing";

const ActivityStatus = ({ user }) => {
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  let { checkUserOnlineStatus } = useChatSocketService();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    checkUserOnlineStatus((users) => {
      setIsOnline(users?.includes(user?._id));
    });
  }, []);

  if (!isOnline) return null;

  return <View style={styles.online}></View>;
};

const _styles = ({ width, height }) =>
  StyleSheet.create({
    online: {
      width: rs(10),
      height: rs(10),
      borderRadius: 100,
      borderWidth: 1,
      position: "absolute",
      bottom: 0,
      right: rvs(2),
      backgroundColor: "#6FCF97",
      borderColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
    },
  });

export default ActivityStatus;
