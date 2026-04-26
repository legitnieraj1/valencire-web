"use client";

import { getProductById } from "@/data/products";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return notFound();
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-ui">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="#" className="hover:text-black transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Image */}
          <div className="relative h-[600px] md:h-[800px] w-full bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center max-w-lg">
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-4">New Season</p>
            <h1 className="text-4xl md:text-5xl font-semibold text-black tracking-tight mb-6">{product.name}</h1>
            <p className="text-2xl font-medium text-gray-800 mb-10">RS. {product.price}.00</p>
            
            <div className="w-8 h-1 bg-black mb-10"></div>

            <p className="text-sm text-gray-500 leading-relaxed mb-10 max-w-md">
              Expertly tailored using premium materials, this piece embodies the Valencire philosophy of modern, editorial menswear. Designed for a perfect fit and unmatched comfort, it effortlessly transitions from day to night.
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-black">Select Size</p>
                <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors font-bold underline underline-offset-4">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3.5 text-[11px] font-bold uppercase tracking-widest border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-200 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-[10px] text-red-500 mt-3 font-bold uppercase tracking-widest">Please select a size</p>
              )}
            </div>

            <button 
              onClick={handleAdd}
              className={`w-full px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-black/10 flex items-center justify-center gap-3 ${
                added
                  ? "bg-green-900 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Bag
                </>
              ) : (
                "Add to Bag"
              )}
            </button>

            <div className="mt-8 flex gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock</span>
              <span>Free Shipping</span>
            </div>

            {/* Accordions */}
            <div className="mt-16 border-t border-gray-100 divide-y divide-gray-100">
              {['Details & Care', 'Size & Fit', 'Shipping & Returns'].map((item) => (
                <div key={item} className="py-6 flex justify-between items-center cursor-pointer group">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">{item}</h3>
                  <Plus className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
