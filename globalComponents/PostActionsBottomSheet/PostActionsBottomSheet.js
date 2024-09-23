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
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackDrop from "./BackDrop";
import { useContext, useMemo, useRef, useState } from "react";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { onUpdateBottomSheet } from "../../state-management/features/bottom_menu/bottom_menuSlice";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import PostApi from "../../ApisManager/PostApi";
import { useQueryClient } from "react-query";
import { actions_categories } from "./util";
import PostActionsSheetContext from "../BottomSheet/PostActionsSheetProvider";
import useUserProfile from "../../Hooks/useUserProfile";

const PostActionsBottomSheet = (props) => {
  let { onRefresh, data } = props;
  const { bottomSheetRef, closeBottomSheet } = useContext(
    PostActionsSheetContext
  );

  let { width, height } = useWindowDimensions();
  let styles = PostActionsBottomSheetStyles({ width, height });
  // variables
  const snapPoints = useMemo(() => ["25%", "30%"], []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: userProfile } = useUserProfile();
  const currentUser = userProfile?.user;

  const postApi = new PostApi();
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
        await postApi.deletePostById(_id);
        next();
      },
    },
  ];

  let options =
    data?.author?._id == currentUser?._id ? editList : actions_categories;

  const actionsBtnPress = (option) => {
    if (option?.key == "clash") {
      navigation?.navigate("ClashDetails", { ...data, openVoiceSheet: true });
    }

    if (option?.key == "message") {
      navigation.navigate("ChatScreen", {
        chat_data: {
          participants: [currentUser, data?.author],
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

    closeBottomSheet();
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
                    currentUser?.my_favorites?.includes(data?._id) &&
                    item?.key == "add_to_favorites"
                  ) {
                    return null;
                  }

                  if (
                    !currentUser?.my_favorites?.includes(data?._id) &&
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
                        style={font(14, "#6B7280", "Regular", 0, 0, {
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
