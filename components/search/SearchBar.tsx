import { Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  SafeAreaView,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";

import { ProductDTO } from "@/types/productDTOs";

import SearchBanner from "./SearchBanner";
import SearchCheckBoxes from "./SearchCheckBoxes";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchError: React.Dispatch<React.SetStateAction<string>>;
  setSearchResults: React.Dispatch<React.SetStateAction<ProductDTO[]>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  fetchResults: (newOffset: number) => Promise<void>;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setSearchError,
  setSearchResults,
  setOffset,
  fetchResults,
}: SearchBarProps) {
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

  return (
    <SafeAreaView style={tw`rounded-b-3xl bg-zinc-50 shadow-md`}>
      <View style={tw`mb-3 px-4 py-2`}>
        <View style={tw`flex-row items-center rounded-full border border-zinc-300 bg-white p-1`}>
          <TextInput
            returnKeyType="done"
            placeholder={`Шукай товари з кешбеком`}
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

        {/* <SearchCheckBoxes /> */}
        <SearchBanner />
      </View>
    </SafeAreaView>
  );
}
