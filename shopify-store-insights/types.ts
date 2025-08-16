
export interface Product {
  title: string;
  vendor: string;
  product_type: string;
  image_url: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialHandles {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
  youtube?: string;
}

export interface ContactDetails {
  emails: string[];
  phone_numbers: string[];
}

export interface ImportantLink {
    text: string;
    url: string;
}

export interface ShopifyStoreInsights {
  brandName: string;
  brandContext: string;
  productCatalog: Product[];
  heroProducts: Product[];
  privacyPolicy: string;
  refundPolicy: string;
  faqs: FAQ[];
  socialHandles: SocialHandles;
  contactDetails: ContactDetails;
  importantLinks: ImportantLink[];
}
