import { Product } from "@/types";

export const products: Product[] = [
    {
        id: "11111111-1111-1111-1111-111111111111",
        name: "The Shroud of Silence",
        slug: "shroud-of-silence",
        price: 350,
        description: "A heavy-weight cotton embrace for those who walk in shadows. Oversized fit with distressed hems.",
        details: [
            "100% Organic Cotton",
            "400 GSM French Terry",
            "Distressed hems",
            "Hand-stitched spine detail",
            "Made in Portugal",
        ],
        images: [
            "/FRONT 1.png",
            "/BACK 1.png",
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "tops",
    },
    {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Vertebrae Tee",
        slug: "vertebrae-tee",
        price: 120,
        description: "Structure meets chaos. Features a puff-print skeletal spine graphic running down the back.",
        details: [
            "100% Pima Cotton",
            "220 GSM",
            "Boxy fit",
            "Puff-print graphic",
        ],
        images: [
            "/FRONT 2.png",
            "/BACK 2.png",
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "tops",
    },
    {
        id: "33333333-3333-3333-3333-333333333333",
        name: "Sinner's Trousers",
        slug: "sinners-trousers",
        price: 280,
        description: "Utility for the modern crusade. Multi-pocket cargo trousers with silver hardware.",
        details: [
            "Heavyweight Canvas",
            "Wide leg fit",
            "Silver branding hardware",
            "8 pockets",
        ],
        images: [
            "/FRONT 1.png",
            "/BACK 1.png",
        ],
        sizes: ["28", "30", "32", "34", "36"],
        category: "bottoms",
    },
    {
        id: "44444444-4444-4444-4444-444444444444",
        name: "Crown of Thorns",
        slug: "crown-of-thorns",
        price: 80,
        description: "A ring of suffering and glory. Sterling silver finish.",
        details: [
            "925 Sterling Silver Plating",
            "Hand-polished",
            "Engraved inner band",
        ],
        images: [
            "https://placehold.co/600x800/0a0a0a/ffffff/png?text=RING",
        ],
        sizes: ["7", "8", "9", "10"],
        category: "accessories",
    },
];
