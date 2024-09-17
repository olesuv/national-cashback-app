import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

export default function SearchScreen() {
  const handleScroll = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw` bg-zinc-50 shadow-md`}>
        <View style={tw`px-4 py-2`}>
          <View style={tw`flex-row items-center rounded-full bg-white p-2`}>
            <TextInput
              style={tw`flex-1 pl-2`}
              placeholder="Search products..."
              placeholderTextColor="#93a1a1"
            />
            <TouchableOpacity style={tw`p-2`}>
              <Octicons name="search" size={20} color="#586e75" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={tw`flex-grow p-4`}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={handleScroll}
      >
        <Text style={tw`mb-4 text-center`}>
          Search results will appear here
        </Text>

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
