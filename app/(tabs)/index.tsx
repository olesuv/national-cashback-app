import Intro from "@/components/home/intro";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={tw`"bg-white dark:bg-zinc-900 h-full`}>
      <View style={tw`flex-col mx-3 top-10`}>
        <Intro />
      </View>
    </View>
  );
}
