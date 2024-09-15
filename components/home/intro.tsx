import { View, Text } from "react-native";
import Slogan from "./slogan";

export default function Intro() {
  return (
    <>
      <Slogan />

      <View className="items-left rounded-md border-2 p-2 bg-inherit border-zinc-200">
        <Text className="text-xl font-bold">that's kinda asss</Text>
      </View>
    </>
  );
}
