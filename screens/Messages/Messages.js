import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Messages/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { RFValue } from "react-native-responsive-fontsize";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import { get_user_chats } from "../../state-management/apiCalls/chat";
import { useSocket } from "../../state-management/apiCalls/SocketContext";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [chats, setChats] = useState([]);
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?._id;
  const socket = useSocket();
  const [refreshing, setRefreshing] = useState(false);

  const fetchChats = async () => {
    const chats = await get_user_chats(currentUserId);
    setChats(chats);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchChats();

    if (socket) {
      // Listen for real-time chat updates
      socket.on("messagesRead", (message) => {
        fetchChats();
      });
      socket.on("message", (message) => {
        fetchChats();
      });
    }
  }, [socket, currentUserId]);

  const PlusIconButton = () => {
    const onPlusPress = () => {
      props?.navigation.navigate("Connections", { user: currentUser });
    };

    return (
      <TouchableOpacity style={styles.plusIconButton} onPress={onPlusPress}>
        <Entypo name="plus" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };

  const unReadMsgs = chats?.reduce((p, c) => {
    let obj = c?.unreadMessagesCount;
    return eval(obj[currentUserId] + p);
  }, 0);

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Direct Message"
        containerStyles={{ height: getPercent(15, height) }}
        rightIcon={<PlusIconButton />}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <View style={styles.searchHeader}>
            <SearchBar />
            <TouchableOpacity style={styles.sortIcon}>
              <Ionicons name="filter" size={RFValue(22)} color="#111827" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsWrapper}>
            <Text style={font(12, "#6B7280", "Medium")}>
              Unread messages ({unReadMsgs || 0})
            </Text>
            <TouchableOpacity style={styles.groupsBtn}>
              <Text style={font(12, "#000000", "Medium")}>Groups</Text>
              <View style={styles.groupsBtnNumberWrapper}>
                <Text style={font(10, "#fff", "Medium")}>0</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.messagesWrapper}>
            {chats?.map((item, index) => {
              return <MessageCard data={item} key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Messages;
