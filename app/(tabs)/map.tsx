import React from "react";
import MapView from "react-native-maps";
import { View } from "react-native";

export default function MapScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-inherit`}>
      <MapView />
    </View>
  );
}
