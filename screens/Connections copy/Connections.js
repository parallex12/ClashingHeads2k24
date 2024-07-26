import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Connections/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import BottomMenu from "../../globalComponents/BottomMenu/BottomMenu";
import { getPercent } from "../../middleware";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../state-management/features/auth";
import TabSelector from "./components/TabSelector";
import UserCard from "./components/UserCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Connections = (props) => {
  let { onPress } = props;
  const { user } = props?.route?.params;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [active, setActive] = useState(0);
  const current_user = useSelector(selectAuthUser);
  const loading = false;
  const dispatch = useDispatch();
  let following = Object.values({ ...user?.following });
  let followers = Object.values({ ...user?.followers });
  let usersToShow = [followers, following, [], []];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StandardHeader
        title={user?.realName || user?.username}
        backButton
        containerStyles={{ height: getPercent(15, height) }}
      />
      <TabSelector user={user} setActive={setActive} active={active} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {usersToShow[active]?.map((item, index) => {
              let isDisplayedUserMe = current_user?.id == item?.id;
              return (
                <UserCard
                  isDisplayedUserMe={isDisplayedUserMe}
                  user={item}
                  key={index}
                  onPress={() => {
                    if (isDisplayedUserMe) {
                      console.log(isDisplayedUserMe);
                      navigation?.navigate("MyProfile");
                    } else {
                      navigation?.navigate("UserProfile", {
                        user: item,
                      });
                     
                    }
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Connections;
