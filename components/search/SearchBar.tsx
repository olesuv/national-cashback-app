import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
} from "react-native";
import React from "react";

import { ProductDTO } from "@/app/(tabs)/search";

import { Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
  );
}
