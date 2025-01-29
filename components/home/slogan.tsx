import { Text,View } from "react-native";

export default function Slogan() {
  return (
    <View style={tw`flex-col`}>
      <Text style={tw`text-5xl font-extrabold tracking-wider text-zinc-300`}>
        🇺🇦 Підтримуй
      </Text>
      <Text style={tw`text-5xl font-extrabold tracking-wider text-zinc-300`}>
        🛍️ Купуй
      </Text>
      <Text style={tw`text-5xl font-extrabold tracking-wider text-zinc-300`}>
        💰 Заощаджуй
      </Text>
    </View>
  );
}
