import TabBar from "@/components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SearchScreen from "./search";
import HomeScreen from "./index";
import SettingsScreen from "./settings";
import ScannerScreen from "./scanner";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen name="index" component={HomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="scanner" component={ScannerScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
