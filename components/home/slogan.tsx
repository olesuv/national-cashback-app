import { View, Text } from "react-native";

export default function Slogan() {
  return (
    <View style={tw`flex-col`}>
      <Text
        style={tw`text-5xl font-extrabold text-zinc-300 items-lefttracking-wider`}
      >
        🇺🇦 Підтримуй
      </Text>
      <Text
        style={tw`text-5xl font-extrabold text-zinc-300 items-lefttracking-wider`}
      >
        🛍️ Купуй
      </Text>
      <Text
        style={tw`text-5xl font-extrabold text-zinc-300 items-lefttracking-wider`}
      >
        💰 Заощаджуй
      </Text>
    </View>
  );
}
