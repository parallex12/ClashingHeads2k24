import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Clashes/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import PostCard from "../../globalComponents/PostCard/PostCard";
import { useRecoilState } from "recoil";
import { global_posts } from "../../state-management/atoms/atoms";
import { font } from "../../styles/Global/main";
import { useNavigation } from "@react-navigation/native";
import DualClashCard from "../Search/components/DualClashCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllChallengeClashes,
  selectChallengeClashError,
  selectChallengeClashLoading,
  selectLastVisibleClash,
} from "../../state-management/features/allChallengeClashes";
import { fetchAllChallengeClashes } from "../../state-management/features/allChallengeClashes/allChallengeClashesSlice";
import StandardButton from "../../globalComponents/StandardButton";
import { sortPostsByCreatedAt } from "../../utils";
import RoomCard from "./components/RoomCard";
import { get_all_challenges } from "../../state-management/apiCalls/challengeClash";

const Clashes = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [clashes, setClashes] = useState([]);

  useEffect(() => {
    getChallenges();
  }, [page]);

  const getChallenges = async () => {
    let all_ch = await get_all_challenges(page);
    setClashes(all_ch?.challenges);
    setRefreshing(false);
  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    getChallenges();
  }, []);

  let memoizedClashes = useMemo(() => {
    return clashes
  }, [clashes]);

  return (
    <View style={styles.container}>
      <StandardHeader searchIcon profile logo />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {/* Header  here */}
          <View style={styles.contentHeaderWrapper}>
            <Text style={font(14, "#111827", "Semibold")}>
              {memoizedClashes?.length} Live Clashes
            </Text>
            <View style={styles.contectActionsWrapper}>
              <TouchableOpacity style={styles.contentCalenderBtn}>
                <Image
                  source={require("../../assets/icons/calendar.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contentCreateBtn}
                onPress={() => navigation.navigate("CreateClash")}
              >
                <Text style={font(13, "#FFFFFF", "Semibold")}>
                  Create Clash
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.contentCreateRoomBtn}
            onPress={() => navigation.navigate("CreateRoom")}
          >
            <Text style={font(13, "#FFFFFF", "Semibold")}>Create Room</Text>
          </TouchableOpacity>
          {[1]?.map((item, index) => {
            return (
              <RoomCard
                onCardPress={() => navigation.navigate("ClashRoom")}
                active={index == 0}
                is_featured={index == 0}
                is_public={index % 2 == 0}
                is_private={index % 2 == 1}
                key={index}
              />
            );
          })}
          {/* Clash cards here */}
          <View style={styles.cardsWrapper}>
            {memoizedClashes?.map((item, index) => {
              return (
                <DualClashCard
                  key={index}
                  data={item}
                  onPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                  onClashesPress={() =>
                    props?.navigation?.navigate("ChallengeClash", { ...item })
                  }
                />
              );
            })}
          </View>
          {/* {clashes?.length > 0 && <StandardButton
            title={loading ? "Loading..." : "Load More"}
            onPress={!loading && loadMoreClashes}
          />} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Clashes;
