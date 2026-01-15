"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/components/providers/CartContext";
import { motion } from "framer-motion";

export default function ProductDetails({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState(0);

    const handleAddToCart = () => {
        if (!selectedSize) return;
        addToCart(product, selectedSize);
    };

    return (
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Image Gallery */}
            <div className="md:w-3/5 space-y-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-[3/4] w-full bg-[#111] overflow-hidden cursor-zoom-in"
                >
                    <Image
                        src={product.images[activeImage]}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-125 transition-transform duration-[1.5s] ease-out"
                    />
                </motion.div>
                {/* Thumbnails if multiple images */}
                {product.images.length > 1 && (
                    <div className="flex gap-4">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`relative w-20 aspect-[3/4] bg-[#111] transition-all duration-300 ${activeImage === idx ? 'opacity-100 ring-1 ring-white' : 'opacity-40 hover:opacity-70'}`}
                            >
                                <Image src={img} alt="" fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="md:w-2/5 flex flex-col pt-4 md:pt-12">
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-[0.1em] mb-4 uppercase">
                    {product.name}
                </h1>
                <p className="text-xl font-mono text-gray-300 mb-8 tracking-widest">${product.price}</p>

                <div className="prose prose-invert mb-12">
                    <p className="text-gray-400 font-body leading-relaxed text-sm tracking-wide">
                        {product.description}
                    </p>
                </div>

                {/* Size Selector */}
                <div className="mb-12">
                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">Select Size</span>
                    <div className="flex flex-wrap gap-4">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 flex items-center justify-center border text-xs font-bold transition-all duration-300 ${selectedSize === size
                                        ? "border-white bg-white text-black"
                                        : "border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Actions */}
                <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`w-full py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 ${selectedSize
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-gray-900 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    {selectedSize ? "Add to Cart" : "Select Size"}
                </button>

                {/* Additional Details */}
                <div className="mt-16 space-y-6 pt-12 border-t border-white/10">
                    {product.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-xs tracking-widest text-gray-500 uppercase">
                            <span className="w-1 h-1 bg-gray-700 rounded-full" />
                            {detail}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
