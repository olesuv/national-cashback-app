import { useState, useCallback, useEffect } from "react";
import { Camera } from "expo-camera";

export const useCameraPermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return { hasPermission, requestPermission };
};
