import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { styles as _styles } from "../../styles/Invite/main";
import StandardHeader from "../../globalComponents/StandardHeader/StandardHeader";
import { getPercent } from "../../middleware";
import { font } from "../../styles/Global/main";
import { AntDesign } from "@expo/vector-icons";
import StandardButton from "../../globalComponents/StandardButton";
import StandardInput from "../../globalComponents/StandardInput";

const Invite = (props) => {
  let {} = props;
  let { width, height } = useWindowDimensions();
  let styles = _styles({ width, height });

  return (
    <View style={styles.container}>
      <StandardHeader
        containerStyles={{ height: getPercent(15, height) }}
        backButton
        title="Invite Friends"
        searchIcon={false}
      />
      <View style={styles.content}>
        <Text
          style={font(14, "#636E72", "Regular", 0, null, {
            textAlign: "center",
            marginBottom: getPercent(2, height),
          })}
        >
          Who’s great addition to ClashingHeads? {"\n"}You’ll get credit for the
          invite on their profile.
        </Text>
        <Text style={font(16, "#000000", "Semibold", getPercent(2, height))}>
          You have two exclusive invites.
        </Text>
        <View style={styles.inviteCard}>
          <View style={styles.inviteCardRow}>
            <View style={styles.inviteCardIcon}>
              <AntDesign name="link" size={22} color="#DB2727" />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={font(14, "#000000", "Semibold")}>Invite Link 1</Text>
              <Text style={font(12, "#000000", "Semibold", 4)}>
                https://clashingheads.com/app/invite
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper}>
            <StandardButton
              title="Copy Link"
              customStyles={{
                paddingHorizontal: getPercent(6, width),
                height: getPercent(4.5, height),
                marginRight: 5,
                backgroundColor: "#F3F4F6",
              }}
              textStyles={{ color: "#1F2937" }}
            />
            <StandardButton
              title="Share"
              customStyles={{
                paddingHorizontal: getPercent(6, width),
                height: getPercent(4.5, height),
              }}
            />
          </View>
        </View>
        <View style={styles.inviteCard}>
          <View style={styles.inviteCardRow}>
            <View style={styles.inviteCardIcon}>
              <AntDesign name="link" size={22} color="#DB2727" />
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={font(14, "#000000", "Semibold")}>
                Send Email Invite
              </Text>
            </View>
          </View>
          <View style={styles.btnWrapper2}>
            <StandardInput
              value={null}
              data={{
                key: "email",
                placeholder: "Enter your email.",
                type: "text",
              }}
              onChangeText={(val) => console.log(val)}
              onRemoveField={() => null}
              inputStyles={{
                width: getPercent(57, width),
                height: getPercent(5, height),
                marginTop:0
              }}
              containerStyles={{
                marginVertical: 0,
                minHeight: getPercent(5, height),
              }}
            />
            <StandardButton
              title="Send"
              customStyles={{
                paddingHorizontal: getPercent(6, width),
                height: getPercent(4.5, height),
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Invite;
