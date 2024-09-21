export interface ProductDTO {
  barcode: string;
  brand: string;
  product_name: string;
  legal_name: string;
  edrpou: string | null;
  rnokpp: string | null;
}

export interface ProductErrorDTO {
  message: string;
  error: string;
  statusCode: number;
}
