import { ProductDTO } from "@/app/(tabs)/search";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SearchPages from "./SearchPages";

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
          <SearchPages
            offset={offset}
            limit={limit}
            searchResults={searchResults}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </ScrollView>
    </View>
  );
}
