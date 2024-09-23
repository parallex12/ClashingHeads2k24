import { MaterialIcons,} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const actions_categories = [
  {
    key: "clash",
    label: "Clash",
    icon: (
      <MaterialIcons
        name="local-fire-department"
        size={RFValue(16)}
        color="#DB2727"
      />
    ),
  },
  // {
  //   key: "message",
  //   label: "Send via message",
  //   icon: <FontAwesome name="send-o" size={RFValue(13)} color="#6B7280" />,
  // },
  // {
  //   key: "invite_to_room",
  //   label: "Invite user to clash room",
  //   icon: <AntDesign name="adduser" size={RFValue(16)} color="#6B7280" />,
  // },
  {
    key: "add_to_favorites",
    label: "Add to favorites",
    icon: (
      <MaterialIcons
        name="favorite-border"
        size={RFValue(15)}
        color="#6B7280"
      />
    ),
  },
  {
    key: "remove_from_favorites",
    label: "Remove from favorites",
    icon: <MaterialIcons name="favorite" size={RFValue(15)} color="#DB2727" />,
  },
  {
    key: "report_post",
    label: "Report post",
    icon: (
      <MaterialIcons
        name="report-gmailerrorred"
        size={RFValue(16)}
        color="#6B7280"
      />
    ),
  },
];
