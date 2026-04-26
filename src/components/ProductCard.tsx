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

  return (
    <div className="group relative">
      <Link href={`/product/${prod.id}`} className="block relative">
        <div className="relative h-[420px] w-full bg-transparent overflow-hidden mb-5 rounded-2xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1">
          <Image src={prod.image} alt={prod.name} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <Link href={`/product/${prod.id}`} className="pr-4 block hover:opacity-80 transition-opacity">
          <h3 className="text-[11px] font-bold text-black uppercase tracking-widest leading-tight">{prod.name}</h3>
          <p className="text-[12px] text-gray-500 mt-2 uppercase tracking-tighter">RS. {prod.price}.00</p>
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setShowSizes(!showSizes);
          }}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0 relative cursor-pointer z-10"
        >
          <ShoppingBag className="w-5 h-5 text-black" strokeWidth={1.5} />
          <Plus className="w-3 h-3 absolute bottom-2 right-2 text-black" strokeWidth={3} />
        </button>
      </div>

      {/* Size Selector Popup */}
      {showSizes && (
        <div className="absolute bottom-14 right-0 bg-white border border-gray-100 shadow-xl rounded-2xl p-4 z-50 w-[200px]">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black">Select Size</p>
            <button onClick={() => setShowSizes(false)}>
              <X className="w-3.5 h-3.5 text-gray-400 hover:text-black transition-colors" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => {
                  addToCart(prod, size);
                  setShowSizes(false);
                }}
                className="py-2.5 text-[10px] font-bold uppercase tracking-widest border border-gray-200 bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-200"
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
