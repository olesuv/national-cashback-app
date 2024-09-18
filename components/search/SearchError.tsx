import { Linking, Text, View } from "react-native";

export default function SearchError({ searchError }: { searchError: string }) {
  return (
    <View style={tw`flex-1 items-center justify-center bg-transparent px-4`}>
      <View style={tw`rounded-xl bg-rose-500 p-4`}>
        <Text style={tw`mb-3 inline-block text-center text-2xl font-semibold text-white`}>{searchError}</Text>
        <View style={tw`flex-col items-start rounded-xl border border-rose-300 bg-rose-400 p-2`}>
          <Text style={tw`pb-2 text-white`}>
            - Не забувай, що не всі товари підпадають під програму "Національний Кешбек"
            <Text style={tw`text-rose-200 underline`} onPress={() => Linking.openURL("https://madeinukraine.gov.ua/")}>
              (дитись тут)
            </Text>
            {"."}
          </Text>
          <Text style={tw`pb-2 text-white`}>
            - Товари оновлюються автоматично щотижня, тому можливо вони з'являться.
          </Text>
          <Text style={tw`text-white`}>
            - Додаток <Text style={tw`underline`}>не</Text> є офіційним.
          </Text>
        </View>
      </View>
    </View>
  );
}
