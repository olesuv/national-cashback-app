import { Alert } from "react-native";

interface IScanProductErrorProps {
  barcodeErrorMessage: string;
  setScanned: (value: boolean) => void;
}

const ErrorMessageMapper = new Map<string, string>([
  ["😞Продукту не знайдено😞", `Продукт не підпадає під програму "Національний Кешбек"`],
]);

export default function ProductErrorAlert({ barcodeErrorMessage, setScanned }: IScanProductErrorProps) {
  return Alert.alert(barcodeErrorMessage, ErrorMessageMapper.get(barcodeErrorMessage), [
    {
      text: "OK",
      onPress: () => setScanned(false),
    },
  ]);
}
