import { useState } from "react";
import { Text, View } from "react-native";

export default function SearchCheckBoxes() {
  const [products, productsSelected] = useState<boolean>(true);
  const [stores, storesSelected] = useState<boolean>(false);

  return (
    <View style={tw`mt-2 flex flex-row px-0`}>
      <View
        style={tw`basis-1/2 items-center justify-center rounded-l-lg border border-zinc-300 py-2
        ${products ? "bg-white" : "bg-zinc-100"}`}
      >
        <Text style={tw`text-sm`} onPress={() => productsSelected(!products)}>
          Продукти / Товари
        </Text>
      </View>
      <View
        style={tw`basis-1/2 items-center justify-center rounded-r-lg border border-zinc-300 py-2
        ${stores ? "bg-white" : "bg-zinc-100"}
        `}
      >
        <Text style={tw`text-sm`} onPress={() => storesSelected(!stores)}>
          Магазини
        </Text>
      </View>
    </View>
  );
}
