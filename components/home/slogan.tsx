import { View, Text } from "react-native";

export default function Slogan() {
  return (
    <View className="flex-col">
      <Text className="text-5xl font-extrabold text-zinc-300 items-lefttracking-wider">
        🇺🇦 Підтримуй
      </Text>
      <Text className="text-5xl font-extrabold text-zinc-300 items-lefttracking-wider">
        🛍️ Купуй
      </Text>
      <Text className="text-5xl font-extrabold text-zinc-300 items-lefttracking-wider">
        💰 Заощаджуй
      </Text>
    </View>
  );
}
