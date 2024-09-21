import { Text, ActivityIndicator, View } from "react-native";

export default function ScannerLoading() {
  return (
    <View style={tw`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <ActivityIndicator size="large" color="#FFFFFF" />
      <Text style={tw`mt-2 text-white`}>Завантаження...</Text>
    </View>
  );
}
