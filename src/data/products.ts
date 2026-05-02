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
  { id: "pant-5", name: "the wide leg — bordeaux", price: "3,000", image: "/oldmoney pics/burgundy trousers1.JPG", images: ["/oldmoney pics/burgundy trousers2.JPG", "/oldmoney pics/burgundy trousers3.JPG", "/oldmoney pics/burgundy trousers4.JPG"], category: "trousers", subcategory: "pleated" },
  { id: "pant-6", name: "the pleat — slate", price: "2,800", image: "/oldmoney pics/gray pleated trousers1.JPG", images: ["/oldmoney pics/gray pleated trousers2.JPG"], category: "trousers", subcategory: "pleated" },
  { id: "shirt-1", name: "the linen shirt — ivory", price: "2,000", image: "/oldmoney pics/OLDMONEY GLOW SHIRT.JPG", images: ["/oldmoney pics/OLDMONEY GLOW SHIRT2.JPG", "/oldmoney pics/OLDMONEY GLOW SHIRT3.JPG", "/oldmoney pics/OLDMONEY GLOW SHIRT4.JPG"], category: "shirts", subcategory: "casual" },
  { id: "shirt-2", name: "the linen shirt — sky", price: "1,900", image: "/oldmoney pics/oldmoney skyblue1.JPG", images: ["/oldmoney pics/oldmoney skyblue2.JPG", "/oldmoney pics/oldmoney skyblue3.JPG"], category: "shirts", subcategory: "casual" },
  { id: "shirt-3", name: "the shirt — ink", price: "1,800", image: "/oldmoney pics/BLACKSHIRT.JPG", images: [], category: "shirts", subcategory: "casual" },
  { id: "misc-1", name: "the classic — stone", price: "2,500", image: "/oldmoney pics/1000055352.JPG", images: [], category: "accessories", subcategory: "classic" },
];

export const BEST_SELLERS = ALL_PRODUCTS.filter((p) => p.category === "trousers" || p.category === "jeans");
export const JUST_ARRIVED = ALL_PRODUCTS;

export const getProductById = (id: string) => ALL_PRODUCTS.find((p) => p.id === id);
