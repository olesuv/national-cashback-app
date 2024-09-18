import { ProductDTO } from "@/app/(tabs)/search";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface SearchResultsProps {
  searchResults: ProductDTO[];
  offset: number;
  limit: number;
  fetchResults: (newOffset: number) => Promise<void>;
  handleScroll: () => void;
}

export default function SearchResults({
  searchResults,
  offset,
  limit,
  fetchResults,
  handleScroll,
}: SearchResultsProps) {
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
  );
}
