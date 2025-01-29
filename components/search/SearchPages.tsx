import { Text, TouchableOpacity, View } from "react-native";

import { PagesIcons } from "@/constants/icons";

interface SearchPagesProps {
  offset: number;
  limit: number;
  searchResults: any[];
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export default function SearchPages({
  offset,
  limit,
  searchResults,
  handlePrevPage,
  handleNextPage,
}: SearchPagesProps) {
  return (
    <View style={tw`flex-row items-center justify-between border-zinc-200 bg-transparent p-4`}>
      <TouchableOpacity
        onPress={handlePrevPage}
        disabled={offset === 0}
        style={tw`rounded-lg bg-black px-4 py-2 ${offset === 0 ? "opacity-50" : ""}`}
      >
        <Text style={tw`font-semibold text-white`}>{PagesIcons.back}</Text>
      </TouchableOpacity>
      <Text style={tw`text-zinc-600`}>{`Сторінка ${Math.floor(offset / limit) + 1}`}</Text>
      <TouchableOpacity
        onPress={handleNextPage}
        disabled={searchResults.length < limit}
        style={tw`rounded-lg bg-black px-4 py-2 ${searchResults.length < limit ? "opacity-50" : ""}`}
      >
        <Text style={tw`font-semibold text-white`}>{PagesIcons.next}</Text>
      </TouchableOpacity>
    </View>
  );
}
