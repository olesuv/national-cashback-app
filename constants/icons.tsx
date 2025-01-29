import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

const tabBariconSize = 25;

export const TabBarIcons = {
  index: (props: Omit<React.ComponentProps<typeof Feather>, "name">) => (
    <Feather name="home" size={tabBariconSize} {...props} />
  ),
  search: (props: Omit<React.ComponentProps<typeof Octicons>, "name">) => (
    <Octicons name="search" size={tabBariconSize} {...props} />
  ),
  scanner: (props: Omit<React.ComponentProps<typeof Ionicons>, "name">) => (
    <Ionicons name="barcode-outline" size={tabBariconSize} {...props} />
  ),
  map: (props: Omit<React.ComponentProps<typeof Ionicons>, "name">) => (
    <Feather name="map-pin" size={tabBariconSize} {...props} />
  ),
};

const pagesIconSize = 20;

export const PagesIcons = {
  back: <Feather name="arrow-left" size={pagesIconSize} color="white" />,
  next: <Feather name="arrow-right" size={pagesIconSize} color="white" />,
};
