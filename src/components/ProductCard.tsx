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
    <div className="group relative border-2 border-black bg-[#FDFBF7] p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] sm:p-3 sm:shadow-[6px_6px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <Link href={`/product/${prod.id}`} className="block relative">
        <div className="relative mb-3 h-[230px] w-full overflow-hidden border-2 border-black bg-[#EAE8E3] sm:mb-4 sm:h-[420px]">
          
          <Image 
            src={displayImages[0]} 
            alt={prod.name} 
            fill 
            className="object-contain object-center filter sepia-[0.2]" 
          />

        </div>
      </Link>
      
      <div className="mt-3 flex items-start justify-between gap-2 px-0.5 sm:mt-4 sm:px-1">
        <Link href={`/product/${prod.id}`} className="block flex-1 hover:opacity-80 transition-opacity sm:pr-4">
          <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.12em] leading-tight sm:text-[13px] sm:tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>{prod.name}</h3>
          <p className="mt-1.5 text-[10px] font-bold text-black uppercase tracking-tighter sm:mt-2 sm:text-[12px]" style={{ fontFamily: "Courier New, monospace" }}>RS. {prod.price}.00</p>
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowSizes(!showSizes);
          }}
          className="relative z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-2 border-black bg-[#FFF44F] shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#FFD700] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:h-10 sm:w-10"
          title="Add to Bag"
        >
          <ShoppingBag className="h-3.5 w-3.5 text-black sm:h-4 sm:w-4" strokeWidth={2.5} />
          <Plus className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 text-black sm:bottom-1 sm:right-1 sm:h-3 sm:w-3" strokeWidth={4} />
        </button>
      </div>

      {/* Size Selector Popup */}
      {showSizes && (
        <div className="absolute bottom-12 right-2 z-50 w-[170px] border-2 border-black bg-[#FDFBF7] p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] sm:bottom-16 sm:right-3 sm:w-[220px] sm:p-4">
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
