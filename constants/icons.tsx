import Octicons from "@expo/vector-icons/Octicons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const iconSize = 25;

export const TabBarIcons = {
  index: (props: Omit<React.ComponentProps<typeof Feather>, "name">) => (
    <Feather
      name="home"
      size={iconSize}
      {...props}
      style={tw`active:text-black dark:active:text-white inactive:text-gray dark:inactive:text-gray`}
    />
  ),
  search: (props: Omit<React.ComponentProps<typeof Octicons>, "name">) => (
    <Octicons name="search" size={iconSize} {...props} />
  ),
  settings: (props: Omit<React.ComponentProps<typeof Ionicons>, "name">) => (
    <Ionicons name="settings" size={iconSize} {...props} />
  ),
  scanner: (props: Omit<React.ComponentProps<typeof Ionicons>, "name">) => (
    <Ionicons name="barcode-outline" size={iconSize} {...props} />
  ),
};
