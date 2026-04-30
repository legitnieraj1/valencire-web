export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  category?: string;
  subcategory?: string;
};

export const ALL_PRODUCTS: Product[] = [
  { id: "pant-1", name: "Men Boot Cut Black Pant", price: "2,499", image: "/images/bootcut_1.png", images: ["/images/bootcut_4.png", "/images/bootcut_3.png"], category: "jeans", subcategory: "bootcut" },
  { id: "pant-2", name: "Men Pleated Pant", price: "2,199", image: "/images/pleated_1.png", images: ["/images/pleated_4.png", "/images/pleated_3.png"], category: "trousers", subcategory: "pleated" },
  { id: "pant-3", name: "Baggy Trouser", price: "2,899", image: "/images/baggy_1.png", images: ["/images/baggy_3.png", "/images/baggy_4.png"], category: "trousers", subcategory: "relaxed-fit" },
  { id: "pant-4", name: "Bush Pants", price: "3,199", image: "/images/bush_1.png", images: ["/images/bush_3.jpg", "/images/bush_4.png"], category: "trousers", subcategory: "cargo" },
];

export const DENIMS = ALL_PRODUCTS;
export const BEST_SELLERS = ALL_PRODUCTS;
export const TOPWEAR = ALL_PRODUCTS;
export const JUST_ARRIVED = ALL_PRODUCTS;

export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);
