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

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const handleSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchQuery(e.nativeEvent.text);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleDonePress = async () => {
    Keyboard.dismiss();

    try {
      const res = await handleSearchQuery(searchQuery);
      if (Array.isArray(res)) {
        setSearchResults(res);
        setSearchError("");
      }
    } catch (err: any) {
      if (err?.statusCode === 404 && err?.error === "Not Found") {
        setSearchError("Нічого не було знайдено по твому запиту 😞");
      } else {
        setSearchError("⚙️ Невідома помилка. Її хтось вже виправляє...");
        console.error(err);
      }
    }
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

      {searchError !== "" ? (
        <View style={tw`flex-1 items-center justify-center bg-transparent px-4`}>
          <View style={tw`rounded-xl bg-rose-500 p-4`}>
            <Text style={tw`rounded pb-3 text-center text-2xl font-semibold text-white`}>{searchError}</Text>
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
        <ScrollView
          contentContainerStyle={tw`flex-grow p-4`}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={handleScroll}
        >
          {searchResults.map((product, index) => (
            <View key={index} style={tw`border-b border-gray-200 p-4`}>
              <Text>{product.product_name}</Text>
              <Text>{product.brand}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

async function handleSearchQuery(searchProductName: string): Promise<ProductDTO[]> {
  return await axios
    .get(`${process.env.EXPO_PUBLIC_API}/products/search-name`, {
      params: {
        name: searchProductName,
      },
    })
    .then((response) => {
      return response.data as ProductDTO[];
    })
    .catch((error) => {
      throw error.response.data as ProductErrorDTO;
    });
}
