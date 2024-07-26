import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Messages/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import { getPercent } from "../../middleware";
import { Entypo, Ionicons } from "@expo/vector-icons";
import SearchBar from "../../globalComponents/SearchBar";
import { RFValue } from "react-native-responsive-fontsize";
import { font } from "../../styles/Global/main";
import MessageCard from "./components/MessageCard";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [chats, setChats] = useState([]);
  const currentUser = useSelector(selectAuthUser);
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchChats = async () => {
      if (!currentUser) return;

      try {
        const db = getFirestore();
        const chatsRef = collection(db, "chats");

        // Query chats where the participants array contains the current user's UID
        const q = query(
          chatsRef,
          where("participants", "array-contains", currentUserId)
        );
        const querySnapshot = await getDocs(q);

        const chatsData = [];
        for (const doc of querySnapshot.docs) {
          const chat = doc.data();

          // Fetch the last message in each chat
          const messagesRef = collection(db, "chats", doc.id, "messages");
          const messagesQuery = query(
            messagesRef,
            orderBy("createdAt", "desc"),
            limit(1)
          );
          const messagesSnapshot = await getDocs(messagesQuery);

          let lastMessage = null;
          messagesSnapshot.forEach((messageDoc) => {
            lastMessage = messageDoc.data();
          });

          // Append chat with last message to chatsData
          chatsData.push({ ...chat, lastMessage });
        }

        setChats(chatsData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [currentUser]);

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

  return (
    <View style={styles.container}>
      <StandardHeader
        title="Direct Message"
        containerStyles={{ height: getPercent(15, height) }}
        rightIcon={<PlusIconButton />}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.searchHeader}>
            <SearchBar />
            <TouchableOpacity style={styles.sortIcon}>
              <Ionicons name="filter" size={RFValue(22)} color="#111827" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsWrapper}>
            <Text style={font(12, "#6B7280", "Medium")}>
              Unread messages (2)
            </Text>
            <TouchableOpacity style={styles.groupsBtn}>
              <Text style={font(12, "#000000", "Medium")}>Groups</Text>
              <View style={styles.groupsBtnNumberWrapper}>
                <Text style={font(10, "#fff", "Medium")}>0</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.messagesWrapper}>
            {chats
              ?.filter((e) => {
                return e?.lastMessage && e;
              })
              ?.map((item, index) => {
                return <MessageCard data={item} key={index} />;
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Messages;
