import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PostActionsBottomSheetStyles, font } from "../../styles/Global/main";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import { useMemo, useRef, useState } from "react";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { selectAuthUser } from "../../state-management/features/auth";
import { update_user_details } from "../../middleware/firebase";
import { setUserDetails } from "../../state-management/features/auth/authSlice";
import FindUserSheet from "../../screens/NewPost/components/FindUserSheet";
import { delete_post_by_id } from "../../state-management/apiCalls/post";

const categories = [
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

const PostActionsBottomSheet = (props) => {
  let { bottomSheetRef, onRefresh, data } = props;
  let { width, height } = useWindowDimensions();
  let styles = PostActionsBottomSheetStyles({ width, height });
  // variables
  const snapPoints = useMemo(() => ["25%", "30%"], []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user_details = useSelector(selectAuthUser);
  const editList = [
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
    {
      key: "edit",
      label: "Edit Post",
      icon: <MaterialIcons name="edit" size={RFValue(13)} color="#6B7280" />,
      onPress: () =>
        navigation.navigate("EditPostDetails", { edit_post: data }),
    },
    {
      key: "delete",
      label: "Remove Post",
      icon: <MaterialIcons name="delete" size={RFValue(13)} color="#6B7280" />,
      onPress: async (_id, next) => {
        await delete_post_by_id(_id);
        next();
      },
    },
  ];

  if (!data) return null;

  let options = data?.author?._id == user_details?._id ? editList : categories;

  const actionsBtnPress = (option) => {
    if (option?.key == "clash") {
      navigation?.navigate("ClashDetails", { ...data, openVoiceSheet: true });
    }

    if (option?.key == "message") {
      navigation.navigate("ChatScreen", {
        chat_data: {
          participants: [user_details, data?.author],
          messages: [],
          _id: null,
          sharedPost: data,
        },
      });
    }

    if (option?.key == "invite_to_room") {
      alert("Coming Soon");
    }

    if (option?.key == "edit") {
      option?.onPress();
    }
    if (option?.key == "delete") {
      option?.onPress(data?._id, () => {
        onRefresh();
      });
    }

    bottomSheetRef.current.close();
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={BackDrop}
        enableContentPanningGesture={false}
        onChange={(e) => dispatch(onUpdateBottomSheet(e))}
      >
        <BottomSheetView style={styles.sheetContentContainer}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <View style={styles.categoriesWrapper}>
                {options?.map((item, index) => {
                  if (
                    user_details?.my_favorites?.includes(data?._id) &&
                    item?.key == "add_to_favorites"
                  ) {
                    return null;
                  }

                  if (
                    !user_details?.my_favorites?.includes(data?._id) &&
                    item?.key == "remove_from_favorites"
                  ) {
                    return null;
                  }

                  return (
                    <TouchableOpacity
                      style={styles.categoriesItemWrapper}
                      key={index}
                      onPress={() => actionsBtnPress(item)}
                    >
                      {item?.icon}
                      <Text
                        style={font(17, "#6B7280", "Regular", 0, 0, {
                          marginLeft: 8,
                        })}
                      >
                        {item?.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default PostActionsBottomSheet;
