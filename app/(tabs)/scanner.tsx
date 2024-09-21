import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, ScanningResult } from "expo-camera";

import { ProductDTO } from "@/types/productDTOs";
import { BARCODE_TYPES } from "@/constants/barcodes";
import { useProductSearch } from "@/hooks/barcodeSearch";
import { useCameraPermission } from "@/hooks/cameraPermission";

import FullInfoPopUp from "@/components/search/details/FullInfoPopUp";
import ProductErrorAlert from "@/components/scanner/ScanProductError";
import InitCamera from "@/components/scanner/InitCamera";
import ScannerLoading from "@/components/scanner/ScannerLoading";

export default function ScannerScreen() {
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState<ProductDTO | null>(null);

  const tabIsFocused = useIsFocused();
  const { hasPermission, requestPermission } = useCameraPermission();
  const { searchProduct, isLoading, error } = useProductSearch();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (error) {
      ProductErrorAlert({
        barcodeErrorMessage: error,
        setScanned: () => setScanned(false),
      });
    }
  }, [error]);

  useEffect(() => {
    if (!isModalVisible) {
      const timer = setTimeout(() => setScanned(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (tabIsFocused) {
      setScanned(false);
    }
  }, [tabIsFocused]);

  const handleBarCodeScanned = useCallback(
    async (scanningRes: ScanningResult) => {
      setScanned(true);

      const data = await searchProduct(scanningRes.data);
      setProduct(data);
      setModalVisible(true);
    },
    [searchProduct],
  );

  const handleCameraReady = useCallback(() => setIsCameraReady(true), []);

  const toggleModal = useCallback(() => setModalVisible((prev) => !prev), []);

  if (hasPermission === null) {
    return <Text style={tw`mt-10 text-center`}>Requesting camera permission...</Text>;
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
                barcodeTypes: BARCODE_TYPES,
              }}
            />
          )}
        </View>
        {isLoading && <ScannerLoading />}
        {product && <FullInfoPopUp infoData={product} isModalVisible={isModalVisible} toggleModal={toggleModal} />}
      </View>
    </View>
  );
}
