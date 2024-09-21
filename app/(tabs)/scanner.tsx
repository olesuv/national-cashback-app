import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Camera, CameraView, ScanningResult } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { ProductDTO, ProductErrorDTO } from "./search";
import axios, { AxiosError } from "axios";

import FullInfoPopUp from "@/components/search/details/FullInfoPopUp";
import ProductErrorAlert from "@/components/scanner/ScanProductError";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const tabIsFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [barcodeErrorMessage, setBarcodeErrorMessage] = React.useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (barcodeErrorMessage) {
      ProductErrorAlert({ barcodeErrorMessage, setScanned });
    }
  }, [barcodeErrorMessage]);

  const handleBarCodeScanned = async (scanningRes: ScanningResult) => {
    setScanned(true);
    setIsLoading(true);

    try {
      await handleSearchByBarcode(scanningRes.data).then((data) => {
        setProduct(data), toggleModal();
      });
    } catch (err: any) {
      if (err?.statusCode === 404 && err?.error === "Not Found" && err?.message === "Nothing found") {
        setBarcodeErrorMessage("😞Продукту не знайдено😞");
      } else if (err?.statusCode === 404 && err?.error === "Not Found" && err?.message === "No barcode was provided") {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <Text style={tw`mt-10 text-center`}>Requesting for camera permission</Text>;
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
              <Text style={tw`mt-2 text-gray-600`}>Камера налаштовується...</Text>
            </View>
          )}
          {tabIsFocused && (
            <CameraView
              style={tw`flex-1 ${isCameraReady ? "" : "hidden"}`}
              onCameraReady={handleCameraReady}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["ean13", "ean8", "code128", "itf14"],
              }}
            />
          )}
        </View>

        <View style={tw`absolute inset-0 flex items-center justify-center`}>
          <View style={tw`h-1/4 w-4/5 rounded-lg border-2 border-white opacity-50`} />
        </View>

        {isLoading && (
          <View style={tw`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={tw`mt-2 text-white`}>Завантаження...</Text>
          </View>
        )}

        <FullInfoPopUp infoData={product} isModalVisible={isModalVisible} toggleModal={toggleModal} />
      </View>
    </View>
  );
}

async function handleSearchByBarcode(barcode: string): Promise<ProductDTO> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API}/products/search-barcode`, {
      params: { barcode: barcode },
      timeout: 5000,
    });
    return response.data as ProductDTO;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ProductErrorDTO>;
      if (axiosError.code === "ECONNABORTED") {
        throw new Error("Request timed out");
      }
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    throw new Error("An unexpected error occurred");
  }
}
