export type EcwidProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  defaultDisplayedPriceFormatted: string;
  imageUrl: string;
  hdThumbnailUrl: string;
  originalImageUrl: string;
};

export type EcwidCategory = {
  id: number;
  name: string;
};
