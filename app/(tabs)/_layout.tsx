import TabBar from "@/components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SearchScreen from "./search";
import HomeScreen from "./index";
import MapSreeen from "./map";
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
      <Tab.Screen name="map" component={MapSreeen} />
    </Tab.Navigator>
  );
}
