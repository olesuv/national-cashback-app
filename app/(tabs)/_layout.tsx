import { Tabs } from "expo-router";

import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useColorScheme } from "react-native";

export default function TabLayout() {
  const userTheme = useColorScheme();

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={focused ? 35 : 25}
              color={userTheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="search"
              size={focused ? 35 : 25}
              color={userTheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-outline"
              size={focused ? 35 : 25}
              color={userTheme === "dark" ? "white" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
