import { ProductDTO } from "@/app/(tabs)/search";
import { Text, Button, View } from "react-native";

import BottomHalf from "react-native-modal";

interface FullInfoProps {
  infoData: ProductDTO;
  isModalVisible: boolean;
  toggleModal: () => void;
}

export default function FullInfoPopUp({ infoData, isModalVisible, toggleModal }: FullInfoProps) {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BottomHalf isVisible={isModalVisible}>
        <View style={tw`absolute inset-x-0 bottom-0 rounded-t-lg bg-white p-4`}>
          <Text style={tw`mb-4 text-2xl font-bold text-black`}>{infoData.product_name}</Text>
          <Text style={tw`text-lg`}>
            <Text style={tw`font-semibold`}>Код товару: </Text>
            {infoData.barcode}
          </Text>
          <Text style={tw`text-lg`}>
            <Text style={tw`font-semibold`}>Компанія: </Text>
            {infoData.brand}
          </Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </BottomHalf>
    </View>
  );
}

// TODO fetch
