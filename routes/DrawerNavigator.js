import { createDrawerNavigator } from "@react-navigation/drawer";
import CommunityGuidelines from "../screens/Authentication/CommunityGuidelines/CommunityGuidelines";
import PersonalInfo from "../screens/Authentication/PersonalInfo/PersonalInfo";

const { Navigator, Screen } = createDrawerNavigator() ;

function DrawerNavigator() {
  return (
    <Navigator>
      <Screen name="CommunityGuidelines" component={CommunityGuidelines} />
      <Screen name="PersonalInfo" component={PersonalInfo} />
    </Navigator>
  );
}


export default DrawerNavigator;
