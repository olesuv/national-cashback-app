import { Linking, Text, View } from "react-native";

export default function SearchRules() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-transparent px-4`}>
      <View style={tw`rounded-xl border border-zinc-400 bg-zinc-200 p-4`}>
        <Text style={tw`pb-3 text-center text-2xl font-semibold text-black`}>🔍 Почни пошук</Text>

        <View style={tw`mb-3 flex-col items-start rounded-xl border border-zinc-200 bg-zinc-100 p-2`}>
          <Text style={tw`pb-2 text-black`}>
            - Шукай по назві товару, бренду або штрих-коду{" "}
            <Text style={tw`text-zinc-500`}>(наприклад "Молоко", "Твій улюблений бренд", "4820000000000")</Text>
            {"."}
          </Text>
        </View>

        <View style={tw`flex-col items-start rounded-xl border border-white bg-zinc-100 p-2`}>
          <Text style={tw`pb-2 text-black`}>
            - Не забувай, що не всі товари підпадають під програму "Національний Кешбек"
            <Text style={tw`text-zinc-500 underline`} onPress={() => Linking.openURL("https://madeinukraine.gov.ua/")}>
              (дитись тут)
            </Text>
            {"."}
          </Text>
          <Text style={tw`pb-2 text-black`}>
            - Товари оновлюються автоматично щотижня, тому можливо вони з'являться.
          </Text>
          <Text style={tw`text-black`}>
            - Додаток <Text style={tw`underline`}>не</Text> є офіційним.
          </Text>
        </View>
      </View>
    </View>
  );
}
