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
import { useState } from "react";

const Messages = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [messages, setMessages] = useState(new Array(10).fill(""));

  const PlusIconButton = () => {
    return (
      <TouchableOpacity style={styles.plusIconButton}>
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
                <Text style={font(10, "#fff", "Medium")}>30</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.messagesWrapper}>
            {messages?.map((item, index) => {
              return <MessageCard key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

export default Messages;
