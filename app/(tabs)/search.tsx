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
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleScroll = () => {
    Keyboard.dismiss();
  };

  const handleDonePress = () => {
    Keyboard.dismiss();
  };

  const handleSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchQuery(e.nativeEvent.text);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw` bg-zinc-50 shadow-md`}>
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

      <ScrollView
        contentContainerStyle={tw`flex-grow p-4`}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={handleScroll}
      >
        <Text style={tw`mb-4 text-center`}>Search results will appear here</Text>

        {/* Sample content */}
        {[...Array(20)].map((_, index) => (
          <Text key={index} style={tw`mt-4`}>
            Sample search result item {index + 1}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
