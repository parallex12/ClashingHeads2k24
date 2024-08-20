import {
  ActivityIndicator,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Connections/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import TabSelector from "./components/TabSelector";
import UserCard from "./components/UserCard";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "react-query";

const Connections = (props) => {
  let { onPress } = props;
  const { user } = props?.route?.params;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const [active, setActive] = useState(0);
  const queryClient = useQueryClient();
  const userDataCached = queryClient.getQueryData(["currentUserProfile"]);
  const current_user = userDataCached?.user;
  const loading = false;
  let following = [...user?.following];
  let followers = [...user?.followers];
  let usersToShow = [followers, following, [], []];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StandardHeader
        title={`@${user?.username}` || user?.realName}
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
              let isDisplayedUserMe = current_user?._id == item?._id;
              return (
                <UserCard
                  isDisplayedUserMe={isDisplayedUserMe}
                  user={item}
                  key={index}
                  onPress={() => {
                    if (isDisplayedUserMe) {
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
