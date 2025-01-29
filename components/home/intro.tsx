import { Text,View } from "react-native";

import Slogan from "./slogan";

export default function Intro() {
  return (
    <>
      <Slogan />

      <View
        style={tw`items-start rounded-md border-2 border-zinc-200 bg-inherit p-2`}
      >
        <Text style={tw`text-xl font-bold`}>that's kinda asss</Text>
      </View>
    </>
  );
}
