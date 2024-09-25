import { FullInfoProps, ProductEctInfoDTO, ProductErrorDTO } from "@/types/productDTOs";
import { Text, View, Pressable } from "react-native";

import BottomHalf from "react-native-modal";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FullInfoPopUp({ infoData, isModalVisible, toggleModal }: FullInfoProps) {
  const [ectInfo, setEctInfo] = useState<ProductEctInfoDTO>({ edrpou: "", rnokpp: "" });

  useEffect(() => {
    if (!infoData.edrpou || !infoData.rnokpp) {
      try {
        fetchEctInfo(infoData.barcode).then((data) => {
          setEctInfo(data);
        });
      } catch (err) {
        console.error(`Server error fetching product ect info: ${err}`);
      }
    } else {
      setEctInfo({
        edrpou: infoData.edrpou,
        rnokpp: infoData.rnokpp,
      });
    }
  }, [infoData]);

  return (
    <View style={tw`absolute flex-1 bg-white`}>
      <BottomHalf isVisible={isModalVisible}>
        <View style={tw`absolute inset-x-0 bottom-0 rounded-t-xl bg-white p-4`}>
          <View style={tw`mb-4`}>
            <Text style={tw`mb-4 text-2xl font-extrabold leading-tight text-black`}>✅ {infoData.product_name}</Text>

            <Text style={tw`text-xl font-bold`}>Інформація про товар:</Text>
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
