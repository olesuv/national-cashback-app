import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity,View } from "react-native";
import { useColorScheme } from "react-native";

import { TabBarIcons } from "@/constants/icons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={tw`absolute bottom-0 flex-row items-center justify-between rounded-t-3xl bg-zinc-50 p-4 shadow-md`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tw`flex-1 items-center justify-center p-4`}
          >
            {
              // @ts-ignore
              TabBarIcons[route.name]({
                isFocused,
                color: isFocused
                  ? colorScheme === "light"
                    ? tw.color("zinc-900")
                    : tw.color("zinc-50")
                  : tw.color("zinc-400"),
              })
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
