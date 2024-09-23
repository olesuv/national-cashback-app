import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { ProductDTO } from "@/types/productDTOs";
import FullInfoPopUp from "./details/FullInfoPopUp";

interface ProductMappingProps {
  product: ProductDTO;
  index: number;
}

export default function SearchResultsMapping({ product, index }: ProductMappingProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View key={index} style={tw`mb-2 rounded-xl border border-zinc-300 bg-white p-4`}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={tw`mb-2  text-lg text-black`}>
          <Text style={tw`font-semibold`}>{product.product_name} </Text>
          <Text style={tw`text-sm text-zinc-500`}>({product.barcode})</Text>
        </Text>
        <Text style={tw`text-base text-zinc-500`}>{product.brand}</Text>
      </TouchableOpacity>
      <FullInfoPopUp infoData={product} isModalVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
}
