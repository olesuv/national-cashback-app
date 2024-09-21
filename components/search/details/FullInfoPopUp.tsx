import { ProductDTO, ProductErrorDTO } from "@/app/(tabs)/search";
import { Text, View, Pressable } from "react-native";

import BottomHalf from "react-native-modal";
import axios from "axios";
import { useState } from "react";

interface FullInfoProps {
  infoData: ProductDTO;
  isModalVisible: boolean;
  toggleModal: () => void;
}

interface ProductEctInfoDTO {
  edrpou: string;
  rnokpp: string;
}

export default function FullInfoPopUp({ infoData, isModalVisible, toggleModal }: FullInfoProps) {
  const [ectInfo, setEctInfo] = useState<ProductEctInfoDTO>({ edrpou: "", rnokpp: "" });

  try {
    fetchEctInfo(infoData.barcode).then((data) => {
      setEctInfo(data);
    });
  } catch (err) {
    console.error(`Server error fetching product ect info: ${err}`);
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <BottomHalf isVisible={isModalVisible}>
        <View style={tw`absolute inset-x-0 bottom-0 rounded-t-xl bg-white p-4`}>
          <View style={tw`mb-4`}>
            <Text style={tw`text-2xl font-bold text-black`}>{infoData.product_name}</Text>
            <Text style={tw`text-lg`}>
              <Text style={tw`font-semibold`}>Код товару: </Text>
              {infoData.barcode}
            </Text>
            <Text style={tw`text-lg`}>
              <Text style={tw`font-semibold`}>Компанія: </Text>
              {infoData.brand}
            </Text>
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-xl font-bold`}>Інформація про виробника:</Text>
            {ectInfo.edrpou === "" && ectInfo.rnokpp === "" ? (
              <Text style={tw`text-lg`}>Інформація виробника відсутня</Text>
            ) : null}
            {ectInfo.edrpou === "" && ectInfo.rnokpp !== "" ? (
              <Text style={tw`text-lg`}>
                <Text style={tw`font-semibold`}>РНОКПП: </Text>
                {ectInfo.rnokpp}
              </Text>
            ) : null}
            {ectInfo.edrpou !== "" && ectInfo.rnokpp === "" ? (
              <Text style={tw`text-lg`}>
                <Text style={tw`font-semibold`}>ЄДРПОУ: </Text>
                {ectInfo.edrpou}
              </Text>
            ) : null}
          </View>

          <Pressable onPress={toggleModal} style={tw`flex-1 items-center rounded-full border p-4`}>
            <Text style={tw`text-lg font-bold`}>Зрозуміло</Text>
          </Pressable>
        </View>
      </BottomHalf>
    </View>
  );
}

async function fetchEctInfo(barcode: string): Promise<ProductEctInfoDTO> {
  return await axios
    .get(`${process.env.EXPO_PUBLIC_API}/products/search-ect-info`, { params: { barcode } })
    .then((response) => {
      return response.data as ProductEctInfoDTO;
    })
    .catch((error) => {
      throw error.response.data as ProductErrorDTO;
    });
}
