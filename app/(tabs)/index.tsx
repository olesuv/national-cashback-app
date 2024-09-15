import Intro from "@/components/home/intro";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-col bg-inherit mx-3 top-10">
      <Intro />
    </View>
  );
}
