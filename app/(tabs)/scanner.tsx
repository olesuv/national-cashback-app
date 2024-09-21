import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraView, ScanningResult } from "expo-camera";
import axios, { AxiosError } from "axios";

import { ProductDTO, ProductErrorDTO } from "./search";

import FullInfoPopUp from "@/components/search/details/FullInfoPopUp";
import ProductErrorAlert from "@/components/scanner/ScanProductError";
import InitCamera from "@/components/scanner/InitCamera";
import ScannerLoading from "@/components/scanner/ScannerLoading";

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const tabIsFocused = useIsFocused();

  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [barcodeErrorMessage, setBarcodeErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    if (barcodeErrorMessage) {
      ProductErrorAlert({
        barcodeErrorMessage,
        setScanned: () => {
          setScanned(false);
          setBarcodeErrorMessage("");
        },
      });
    }
  }, [barcodeErrorMessage]);

  useEffect(() => {
    if (!isModalVisible) {
      setTimeout(() => {
        setScanned(false);
      }, 500);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (tabIsFocused) {
      setScanned(false);
      setBarcodeErrorMessage("");
    }
  }, [tabIsFocused]);

  const handleBarCodeScanned = useCallback(
    async (scanningRes: ScanningResult) => {
      setScanned(true);
      setIsLoading(true);

      try {
        const data = await handleSearchByBarcode(scanningRes.data);
        setProduct(data);
        toggleModal();
      } catch (err: any) {
        if (err?.statusCode === 404 && err?.message === "Nothing found") {
          setBarcodeErrorMessage("😞Продукту не знайдено😞");
        } else if (err?.statusCode === 404 && err?.message === "No barcode was provided") {
          setScanned(false);
          return;
        } else {
          setBarcodeErrorMessage("Сталася помилка. Спробуйте ще раз");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [toggleModal],
  );

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

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
          {!isCameraReady && <InitCamera />}
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
        {isLoading && <ScannerLoading />}

        <FullInfoPopUp infoData={product} isModalVisible={isModalVisible} toggleModal={toggleModal} />
      </View>
    </View>
  );
}

async function handleSearchByBarcode(barcode: string): Promise<ProductDTO> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API}/products/search-barcode`, {
      params: { barcode },
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
