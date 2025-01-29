import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

export default function SearchBanner() {
  return (
    <LinearGradient
      colors={["rgba(18,62,204,1)", "rgb(0,174,255)"]}
      start={[0, 0]}
      end={[1, 0]}
      style={tw`mt-3 rounded-xl p-4`}
    >
      <View style={tw`flex flex-row`}>
        <Text style={tw`mr-3 text-lg font-semibold text-white`}>Отримуй кешбек в</Text>
        <View style={tw`rounded bg-white p-1`}>
          <Text style={tw`text-sm font-bold`}>10%</Text>
        </View>
      </View>
    </LinearGradient>
  );
}
