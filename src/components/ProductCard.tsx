"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductCard({ prod }: { prod: Product }) {
  const { addToCart } = useCart();
  const [showSizes, setShowSizes] = useState(false);

  // Ensure there are always at least two images
  const displayImages = prod.images && prod.images.length > 1 
    ? prod.images 
    : [prod.image, prod.image]; // Mock if missing

  return (
    <div className="group relative border-2 border-black bg-[#FDFBF7] p-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300">
      <Link href={`/product/${prod.id}`} className="block relative">
        <div className="relative h-[420px] w-full border-2 border-black overflow-hidden mb-4 bg-[#EAE8E3]">
          
          <Image 
            src={displayImages[0]} 
            alt={prod.name} 
            fill 
            className="object-contain object-center filter sepia-[0.2]" 
          />

        </div>
      </Link>
      
      <div className="flex justify-between items-start mt-4 px-1">
        <Link href={`/product/${prod.id}`} className="pr-4 block hover:opacity-80 transition-opacity flex-1">
          <h3 className="text-[13px] font-bold text-black uppercase tracking-widest leading-tight" style={{ fontFamily: "Courier New, monospace" }}>{prod.name}</h3>
          <p className="text-[12px] font-bold text-black mt-2 uppercase tracking-tighter" style={{ fontFamily: "Courier New, monospace" }}>RS. {prod.price}.00</p>
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowSizes(!showSizes);
          }}
          className="w-10 h-10 border-2 border-black bg-[#FFF44F] shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-center active:translate-y-[3px] active:translate-x-[3px] active:shadow-none hover:bg-[#FFD700] transition-all cursor-pointer z-10 shrink-0 relative"
          title="Add to Bag"
        >
          <ShoppingBag className="w-4 h-4 text-black" strokeWidth={2.5} />
          <Plus className="w-3 h-3 absolute bottom-1 right-1 text-black font-bold" strokeWidth={4} />
        </button>
      </div>

      {/* Size Selector Popup */}
      {showSizes && (
        <div className="absolute bottom-16 right-3 bg-[#FDFBF7] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 z-50 w-[220px]">
          <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-black" style={{ fontFamily: "Courier New, monospace" }}>Select Size</p>
            <button onClick={() => setShowSizes(false)} className="hover:rotate-90 transition-transform">
              <X className="w-4 h-4 text-black" strokeWidth={2.5} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => {
                  addToCart(prod, size);
                  setShowSizes(false);
                }}
                className="py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-black bg-white text-black hover:bg-black hover:text-[#FFF44F] transition-all duration-200 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                style={{ fontFamily: "Courier New, monospace" }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
