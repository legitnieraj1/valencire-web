export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
  subcategory?: string;
};

export const DENIMS: Product[] = [
  { id: "denim-1", name: "Straight Fit Jeans (Dark Wash)", price: "1,599", image: "/images/jeans_dark_wash.png", category: "jeans", subcategory: "straight-leg" },
  { id: "denim-2", name: "Straight Fit Jeans (Rustic Wash)", price: "1,699", image: "/images/jeans_rustic_wash.png", category: "jeans", subcategory: "straight-leg" },
  { id: "denim-3", name: "Stretch Jeans (Dusk)", price: "1,649", image: "/images/jeans_dusk.png", category: "jeans", subcategory: "slim-fit" },
  { id: "denim-4", name: "Straight Fit Jeans (Black)", price: "1,599", image: "/images/jeans_black.png", category: "jeans", subcategory: "straight-leg" },
];

export const BEST_SELLERS: Product[] = [
  { id: "bs-1", name: "Straight Fit Jeans (Grain Blue)", price: "1,699", image: "/images/jeans_grain_blue.png", category: "jeans", subcategory: "straight-leg" },
  { id: "bs-2", name: "Vintage Bootcut Denim (Sun-Faded Blue)", price: "1,749", image: "/images/jeans_sun_faded.png", category: "jeans", subcategory: "bootcut" },
  { id: "bs-3", name: "Baggy Fit Denim (Dark Blue)", price: "1,749", image: "/images/jeans_dark_wash.png", category: "jeans", subcategory: "relaxed-fit" },
  { id: "bs-4", name: "Vintage Bootcut Denim (Black Rinse)", price: "1,749", image: "/images/jeans_black.png", category: "jeans", subcategory: "bootcut" },
];

export const TOPWEAR: Product[] = [
  { id: "top-1", name: "Classic Shirt (Dark Heather)", price: "1,099", image: "/images/shirt_dark_heather.png", category: "shirts", subcategory: "casual-shirts" },
  { id: "top-2", name: "Classic Shirt (Steel)", price: "1,099", image: "/images/shirt_steel.png", category: "shirts", subcategory: "formal-dress-shirts" },
  { id: "top-3", name: "Classic Shirt (Sand Check)", price: "1,099", image: "/images/shirt_sand_check.png", category: "shirts", subcategory: "casual-shirts" },
  { id: "top-4", name: "Classic Shirt (Blue Check)", price: "1,099", image: "/images/shirt_blue_check.png", category: "shirts", subcategory: "casual-shirts" },
];

export const JUST_ARRIVED: Product[] = [
  { id: "ja-1", name: "Beige Pleated Pants", price: "3,499", image: "/images/jeans_sun_faded.png", category: "trousers", subcategory: "pleated-pants" },
  { id: "ja-2", name: "White Oversized Shirt", price: "2,499", image: "/images/shirt_steel.png", category: "shirts", subcategory: "overshirts" },
  { id: "ja-3", name: "Olive Cargo Pants", price: "3,199", image: "/images/jeans_dusk.png", category: "trousers", subcategory: "cargo-pants" },
  { id: "ja-4", name: "Dark Blue Cliff Bootcut...", price: "2,599", image: "/images/jeans_grain_blue.png", category: "jeans", subcategory: "bootcut" },
];

export const ALL_PRODUCTS = [...DENIMS, ...BEST_SELLERS, ...TOPWEAR, ...JUST_ARRIVED];

export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);
