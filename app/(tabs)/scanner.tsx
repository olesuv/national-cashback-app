import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native"; // Import StyleSheet
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // bg-gray-100
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraWrapper: {
    height: "25%", // h-1/4
    width: "80%", // w-4/5
    overflow: "hidden",
    borderRadius: 8, // rounded-lg
    backgroundColor: "#e5e7eb", // bg-gray-200
    position: "relative",
  },
  cameraView: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Position over the camera
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb", // bg-gray-200, matches wrapper background
  },
});

export default function ScannerScreen() {
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [product, setProduct] = useState<ProductDTO | null>(null);

  const tabIsFocused = useIsFocused();
  const { hasPermission, requestPermission } = useCameraPermission(); // Make sure this hook requests camera permissions properly
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
    } else {
      setIsCameraReady(false);
      setProduct(null);
      setModalVisible(false);
    }
  }, [tabIsFocused]);

  const handleBarCodeScanned = useCallback(
    async (scanningRes: ScanningResult) => {
      if (!scanned) {
        setScanned(true);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const data = await searchProduct(scanningRes.data);
        setProduct(data);
        setModalVisible(true);
      }
    },
    [searchProduct, scanned],
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
    <View style={styles.container}>
      {" "}
      <View style={styles.cameraContainer}>
        {" "}
        <View style={styles.cameraWrapper}>
          {" "}
          {tabIsFocused && hasPermission && (
            <CameraView
              style={styles.cameraView}
              onCameraReady={handleCameraReady}
              onBarcodeScanned={isCameraReady && !scanned ? handleBarCodeScanned : undefined}
              barcodeScannerSettings={{
                barcodeTypes: BARCODE_TYPES,
              }}
            />
          )}
          {!isCameraReady && (
            <View style={styles.overlay}>
              <InitCamera />
            </View>
          )}
        </View>
        {isLoading && <ScannerLoading />}
        {product && <FullInfoPopUp infoData={product} isModalVisible={isModalVisible} toggleModal={toggleModal} />}
      </View>
    </View>
  );
}
