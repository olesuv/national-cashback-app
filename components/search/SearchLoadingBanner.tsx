import { ActivityIndicator, Text, View } from "react-native";

export default function SearchLoading() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator size="large" style={tw`text-black`} />
      <Text style={tw`mt-2 text-zinc-500`}>Завантаження...</Text>
    </View>
  );
}
