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
export interface FullInfoProps {
  infoData: ProductDTO;
  isModalVisible: boolean;
  toggleModal: () => void;
}

export interface ProductEctInfoDTO {
  edrpou: string;
  rnokpp: string;
}
