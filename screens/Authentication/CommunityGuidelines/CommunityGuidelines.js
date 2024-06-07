import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { styles as _styles } from "../../../styles/CommunityGuidelines/main";
import { font } from "../../../styles/Global/main";
import StandardButton from "../../../globalComponents/StandardButton";
import { getPercent } from "../../../middleware";
import BackButton from "../../../globalComponents/BackButton";
import { useState } from "react";
import { addUser } from "../../../middleware/firebase";
import auth from "@react-native-firebase/auth";
import { startLoading, stopLoading } from "../../../state-management/features/screen_loader/loaderSlice";
import { selectAuthUser,  } from "../../../state-management/features/auth";

const CommunityGuidelines = (props) => {
  let { route } = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });
  const user = auth().currentUser
  const dispatch = useDispatch()
  const user_profile_details=useSelector(selectAuthUser) || {}

  const onContinue = () => {
    dispatch(startLoading())
    addUser(user?.uid, { tos: true, createdAt: new Date().toISOString(), phone: user?.phoneNumber })
      .then((res) => {
        dispatch(stopLoading())
        if (!user_profile_details?.hasPersonalInfo) {
          props?.navigation?.navigate("PersonalInfo");
        }
      })
      .catch((e) => {
        dispatch(stopLoading())
        console.log(e)
      })
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <BackButton />
          <View style={styles.formWrapper}>
            <Text style={font(20, "#120D26", "Semibold", 3)}>
              Community Guidelines
            </Text>
            <Text style={font(12, "#4B5563", "Regular", 7)}>
              Last updated 26 Dec 2023
            </Text>

            <View style={{ paddingTop: getPercent(3, height) }}>
              <Text style={font(13, "#404040", "Regular", 10)}>
                Clashing Heads is a “First Amendment,” Free Speech platform. We
                encourage discussion and debate from all sides.
              </Text>

              <Text style={font(13, "#404040", "Semibold", 15)}>
                Disagree, but don’t be disagreeable!{"\n"}
                <Text style={font(13, "#404040", "Regular", 5)}>
                  Personal attacks (such as hateful language or discrimination)
                  will not be tolerated. If you disagree with somebody, do it
                  with humor! Use our CH stickers to vent!
                </Text>
              </Text>

              <Text style={font(13, "#404040", "Semibold", 15)}>
                No harmful activity{"\n"}
                <Text style={font(13, "#404040", "Regular")}>
                  We prohibit any activity that could hurt someone from scams to
                  threats to intimidation to libel / slander to trolling to
                  physical harm. DON’T DO IT!
                </Text>
              </Text>

              <Text style={font(13, "#404040", "Semibold", 15)}>
                Be respectful{"\n"}
                <Text style={font(13, "#404040", "Regular")}>
                  We’re all in this together – So, no yelling, no profanity, no
                  insults. Try to be Honest! No fake news! – Provide cites!
                </Text>
              </Text>
            </View>
          </View>
          <StandardButton
            title="Agree & Continue"
            customStyles={{
              height: getPercent(7, height),
              marginVertical: getPercent(3, height),
            }}
            onPress={onContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CommunityGuidelines;
