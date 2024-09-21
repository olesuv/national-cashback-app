import { Text, ActivityIndicator, View } from "react-native";

export default function InitCamera() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator size="large" color="#4B5563" />
      <Text style={tw`mt-2 text-gray-600`}>Камера налаштовується...</Text>
    </View>
  );
}
