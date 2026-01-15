export interface Product {
    id: string;
    name: string;
    price: number;
    slug: string;
    description: string;
    details: string[];
    images: string[];
    sizes: string[];
    category: "tops" | "bottoms" | "accessories";
}

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}
