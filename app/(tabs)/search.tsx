import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Linking,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";

export interface ProductDTO {
  barcode: string;
  brand: string;
  product_name: string;
  legal_name: string;
}

interface ProductErrorDTO {
  message: string;
  error: string;
  statusCode: number;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ProductDTO[]>([]);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const handleSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchQuery(e.nativeEvent.text);
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setSearchQuery("");
    setSearchError("");
    setSearchResults([]);
    setOffset(0);
  };

  const handleDonePress = async () => {
    Keyboard.dismiss();
    await fetchResults(0);
  };

  const fetchResults = async (newOffset: number) => {
    try {
      const res = await handleSearchQuery(searchQuery, limit, newOffset);
      setSearchResults(res);
      setOffset(newOffset);
      setSearchError("");
    } catch (err: any) {
      if (err?.statusCode === 404 && err?.error === "Not Found") {
        setSearchError("Нічого не було знайдено по твому запиту 😞");
      } else {
        setSearchError("⚙️ Невідома помилка. Її хтось вже виправляє...");
        console.error(err);
      }
    }
  };
  const handlePrevPage = () => {
    if (offset >= limit) {
      fetchResults(offset - limit);
    }
  };

  const handleNextPage = () => {
    fetchResults(offset + limit);
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`bg-zinc-50 shadow-md`}>
        <View style={tw`px-4 py-2`}>
          <View style={tw`flex-row items-center rounded-xl border border-zinc-300 bg-white p-1`}>
            <TextInput
              returnKeyType="done"
              placeholder="Знайти товар..."
              value={searchQuery}
              onChange={handleSearchChange}
              onSubmitEditing={handleDonePress}
              style={tw`flex-1 pl-2`}
            />
            <TouchableOpacity activeOpacity={1} style={tw`flex-row items-end justify-between gap-4 p-2`}>
              {searchQuery.length > 0 && (
                <MaterialIcons name="clear" size={20} onPress={handleClear} style={tw`text-zinc-400`} />
              )}
              <Octicons name="search" size={20} onPress={handleDonePress} style={tw`text-zinc-400`} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {searchError === "" && searchResults.length === 0 && (
        <View style={tw`flex-1 items-center justify-center bg-transparent px-4`}>
          <View style={tw`rounded-xl border border-zinc-400 bg-zinc-200 p-4`}>
            <Text style={tw`pb-3 text-center text-2xl font-semibold text-black`}>🔍 Почни пошук</Text>

            <View style={tw`mb-3 flex-col items-start rounded-xl border border-zinc-200 bg-zinc-100 p-2`}>
              <Text style={tw`pb-2 text-black`}>
                - Шукай по назві товару, бренду або штрих-коду{" "}
                <Text style={tw`text-zinc-500`} onPress={() => Linking.openURL("https://madeinukraine.gov.ua/")}>
                  (наприклад "Молоко", "Твій улюблений бренд", "4820000000000")
                </Text>
                {"."}
              </Text>
            </View>

            <View style={tw`flex-col items-start rounded-xl border border-white bg-zinc-100 p-2`}>
              <Text style={tw`pb-2 text-black`}>
                - Не забувай, що не всі товари підпадають під програму "Національний Кешбек"
                <Text
                  style={tw`text-zinc-500 underline`}
                  onPress={() => Linking.openURL("https://madeinukraine.gov.ua/")}
                >
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
      )}

      {searchError !== "" ? (
        <View style={tw`flex-1 items-center justify-center bg-transparent px-4`}>
          <View style={tw`rounded-xl bg-rose-500 p-4`}>
            <Text style={tw`pb-3 text-center text-2xl font-semibold text-white`}>{searchError}</Text>
            <View style={tw`flex-col items-start rounded-xl border border-rose-300 bg-rose-400 p-2`}>
              <Text style={tw`pb-2 text-white`}>
                - Не забувай, що не всі товари підпадають під програму "Національний Кешбек"
                <Text
                  style={tw`text-rose-200 underline`}
                  onPress={() => Linking.openURL("https://madeinukraine.gov.ua/")}
                >
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
      ) : (
        <View style={tw`flex-1`}>
          <ScrollView
            contentContainerStyle={tw`flex-grow p-4`}
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={handleScroll}
          >
            {searchResults.map((product, index) => (
              <View key={index} style={tw`mb-2 rounded-lg border border-zinc-300 bg-white p-4`}>
                <Text style={tw`text-base font-semibold text-black`}>{product.product_name}</Text>
                <Text style={tw`text-sm text-zinc-500`}>({product.barcode})</Text>
                <Text style={tw`text-sm text-zinc-500`}>{product.brand}</Text>
              </View>
            ))}

            {searchResults.length > 0 && (
              <View style={tw`mb-20 flex-row items-center justify-between border-zinc-200 bg-transparent p-4`}>
                <TouchableOpacity
                  onPress={handlePrevPage}
                  disabled={offset === 0}
                  style={tw`rounded-lg bg-blue-500 px-4 py-2 ${offset === 0 ? "opacity-50" : ""}`}
                >
                  <Text style={tw`font-semibold text-white`}>Попередня</Text>
                </TouchableOpacity>
                <Text style={tw`text-zinc-600`}>{`Сторінка ${Math.floor(offset / limit) + 1}`}</Text>
                <TouchableOpacity
                  onPress={handleNextPage}
                  disabled={searchResults.length < limit}
                  style={tw`rounded-lg bg-blue-500 px-4 py-2 ${searchResults.length < limit ? "opacity-50" : ""}`}
                >
                  <Text style={tw`font-semibold text-white`}>Наступна</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

async function handleSearchQuery(searchProductName: string, limit: number, offset: number): Promise<ProductDTO[]> {
  return await axios
    .get(`${process.env.EXPO_PUBLIC_API}/products/search-name`, {
      params: {
        name: searchProductName,
        limit: limit,
        offset: offset,
      },
    })
    .then((response) => {
      return response.data as ProductDTO[];
    })
    .catch((error) => {
      throw error.response.data as ProductErrorDTO;
    });
}
