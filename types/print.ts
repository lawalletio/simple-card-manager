export interface PrintOrder {
  total: number;
  totalSats: number;
  currency: string;

  blockNumber?: string;
  imageUrl?: string;
  qrcode?: string;
  currencyB?: string;
  totalB?: string;
}
