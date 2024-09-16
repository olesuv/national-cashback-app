import Intro from "@/components/home/intro";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={tw`h-full bg-white dark:bg-zinc-900`}>
      <View style={tw`top-10 mx-3 flex-col`}>
        <Intro />
      </View>
    </View>
  );
}
