import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { ProductDTO } from "@/types/productDTOs";
import { API_ENDPOINT } from "@/constants/configs";

export const useProductSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProduct = useCallback(async (barcode: string): Promise<ProductDTO | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<ProductDTO>(`${API_ENDPOINT}/products/search-barcode`, {
        params: { barcode },
        timeout: 5000,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        if (axiosError.code === "ECONNABORTED") {
          setError("Request timed out");
        } else if (axiosError.response) {
          if (axiosError.response.status === 404) {
            if (axiosError.response.data.message === "Nothing found") {
              setError("😞Продукту не знайдено😞");
            } else if (axiosError.response.data.message === "No barcode was provided") {
              setError("No barcode provided");
            }
          } else {
            setError("An error occurred. Please try again.");
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { searchProduct, isLoading, error };
};
