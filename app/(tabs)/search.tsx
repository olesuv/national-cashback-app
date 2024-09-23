import React from "react";
import axios from "axios";
import { View, Keyboard } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import SearchRules from "@/components/search/SearchRules";
import SearchError from "@/components/search/SearchError";
import SearchResults from "@/components/search/SearchReuslts";
import SearchBar from "@/components/search/SearchBar";
import { ProductDTO, ProductErrorDTO } from "@/types/productDTOs";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<ProductDTO[]>([]);
  const [offset, setOffset] = React.useState(0);
  const SEARCH_LIMIT = 10;

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const fetchResults = async (newOffset: number) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setSearchError("⚠️ Немає підключення до Інтернету");
      return;
    }

    try {
      const res = await handleSearchQuery(searchQuery, SEARCH_LIMIT, newOffset);
      setSearchResults(res);
      setOffset(newOffset);
      setSearchError("");
    } catch (err: any) {
      if (err?.statusCode === 404 && err?.error === "Not Found") {
        setSearchError("😞 Нічого не було знайдено по твому запиту");
      } else {
        setSearchError("⚙️ Невідома помилка. Її хтось вже виправляє...");
        console.error(err);
      }
    }
  };

  return (
    <View style={tw`flex-1`}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchError={setSearchError}
        setSearchResults={setSearchResults}
        setOffset={setOffset}
        fetchResults={fetchResults}
      />

      <View style={tw`mb-20 flex-1`}>
        {searchError !== "" ? (
          <SearchError searchError={searchError} />
        ) : searchResults.length === 0 ? (
          <SearchRules />
        ) : (
          <SearchResults
            searchResults={searchResults}
            handleScroll={handleScroll}
            offset={offset}
            limit={SEARCH_LIMIT}
            fetchResults={fetchResults}
          />
        )}
      </View>
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
