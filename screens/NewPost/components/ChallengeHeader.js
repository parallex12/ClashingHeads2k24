import React, { useEffect, useState, useCallback, memo } from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { ClashesResultStyles as _styles } from "../../../styles/Search/main";
import { font } from "../../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import { Blurhash } from "react-native-blurhash";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import FastImage from "react-native-fast-image";

const ClashUserCard = memo(({ user, type, audio }) => {
  const [imageLoad, setImageLoad] = useState(true);
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const currentUser = userDataCached?.user;
  const navigation = useNavigation();

  return (
    <View style={styles.clashUserItem}>
      <TouchableOpacity
        style={styles.clashUserItem}
        onPress={() => {
          if (user?.id == currentUser?.id) {
            navigation?.navigate("MyProfile");
          } else {
            navigation?.navigate("UserProfile", {
              user: user,
            });
          }
        }}
      >
        <View style={styles.clashUserProfile}>
          <FastImage
            source={{
              uri: user?.profile_photo,
              priority: FastImage.priority.normal,
            }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={font(14, "#000000", "Semibold", 3)}>{user?.realName}</Text>
        <Text style={font(12, "#9CA3AF", "Medium", 3)}>{type}</Text>
      </TouchableOpacity>
    </View>
  );
});

const ChallengeHeader = (props) => {
  const { data, onPress } = props;
  const { width, height } = useWindowDimensions();
  const styles = _styles({ width, height });
  let { challenger, opponent } = data;

  return (
    <View style={styles.clashesCardCont}>
      <Text style={styles.clashesCardTitle}>“{data?.title}”</Text>
      <TouchableOpacity
        style={styles.clashesCardUsersCont}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {challenger && <ClashUserCard user={challenger} type="Challenger" />}
        <Text style={styles.vsText}>VS</Text>
        {opponent && <ClashUserCard user={opponent} type="Opponent" />}
      </TouchableOpacity>
    </View>
  );
};

export default ChallengeHeader;
