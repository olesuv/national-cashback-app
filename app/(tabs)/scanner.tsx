import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { Camera, CameraView, ScanningResult } from "expo-camera";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (scanningRes: ScanningResult) => {
    setScanned(true);
    Alert.alert(
      "Barcode Scanned",
      `Bar code with type ${scanningRes.type} and data ${scanningRes.data} has been scanned!`,
      [
        {
          text: "OK",
          onPress: () => setScanned(false),
        },
      ],
    );
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return (
      <Text style={tw`mt-10 text-center`}>
        Requesting for camera permission
      </Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={tw`mt-10 text-center`}>No access to camera</Text>;
  }

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-1 items-center justify-center`}>
        <View style={tw`h-1/4 w-4/5 overflow-hidden rounded-lg bg-gray-200`}>
          {!isCameraReady && (
            <View style={tw`flex-1 items-center justify-center`}>
              <ActivityIndicator size="large" color="#4B5563" />
              <Text style={tw`mt-2 text-gray-600`}>
                Камера налаштовується...
              </Text>
            </View>
          )}
          <CameraView
            style={tw`flex-1 ${isCameraReady ? "" : "hidden"}`}
            onCameraReady={handleCameraReady}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["ean13", "ean8", "code128", "itf14"],
            }}
          />
        </View>

        <View style={tw`absolute inset-0 flex items-center justify-center`}>
          <View
            style={tw`h-1/4 w-4/5 rounded-lg border-2 border-white opacity-50`}
          />
        </View>
      </View>
    </View>
  );
}
