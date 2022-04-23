export type Images = {
  edges: {
    node: {
      width: number,
      height: number,
      altText: string,
      originalSrc: string,
    }
  }
};

export type PriceRange = {
  minVariantPrice: {
    amount: number,
    currencyCode: string,
  }
};

export type Item = {
  node: any;
  vendor: string,
  description: string,
  handle: string,
  title: string,
  id: string,
  images: Images,
  priceRange: PriceRange,
};

export type Result = {
  data: {
    products: {
      length: number,
      edges: Item[]
    }
  }
} | null;
