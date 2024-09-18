import { ProductDTO } from "@/app/(tabs)/search";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SearchPages from "./SearchPages";
import SearchResultsMapping from "./SearchResultsMapping";

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
          <SearchResultsMapping key={index} product={product} index={index} />
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
