import { ProductDTO } from "@/app/(tabs)/search";
import { View, Text } from "react-native";

interface ProductMappingProps {
  product: ProductDTO;
  index: number;
}

export default function SearchResultsMapping({ product, index }: ProductMappingProps) {
  return (
    <View key={index} style={tw`mb-2 rounded-lg border border-zinc-300 bg-white p-4`}>
      <Text style={tw`text-base font-semibold text-black`}>{product.product_name}</Text>
      <Text style={tw`text-sm text-zinc-500`}>({product.barcode})</Text>
      <Text style={tw`text-sm text-zinc-500`}>{product.brand}</Text>
    </View>
  );
}
