"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/data/products";
import Link from "next/link";

type CartItem = Product & {
  quantity: number;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, isCartOpen, setIsCartOpen }}>
      {children}
      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-ui">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-[inset_4px_0px_0px_rgba(0,0,0,1)] flex flex-col transform transition-transform duration-300 border-l-[4px] border-black">
            <div className="p-8 border-b-[4px] border-black flex justify-between items-center bg-[#EAE8E3]">
              <h2 className="text-[18px] font-bold uppercase tracking-[0.2em] text-black" style={{ fontFamily: "Courier New, monospace" }}>Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 border-2 border-black bg-[#FFF44F] flex items-center justify-center active:translate-y-[2px] active:translate-x-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none transition-all hover:bg-[#FFD700]">
                 <span className="font-bold text-black" style={{ fontFamily: "Courier New, monospace" }}>X</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-[14px] text-black font-bold uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b-[3px] border-black pb-8 last:border-b-0">
                    <div className="w-24 h-32 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-hidden bg-[#EAE8E3]">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover filter sepia-[0.2]" />
                    </div>
                    <div className="flex-1 pt-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[13px] font-bold uppercase tracking-widest leading-tight text-black" style={{ fontFamily: "Courier New, monospace" }}>{item.name}</h3>
                        <p className="text-[14px] text-gray-800 mt-2 font-bold" style={{ fontFamily: "Courier New, monospace" }}>RS. {item.price}.00</p>
                      </div>
                      <div className="flex justify-between items-end mt-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Size: {item.size}</span>
                          <span className="text-[11px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Qty: {item.quantity}</span>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-[11px] uppercase font-bold tracking-widest text-black hover:text-red-600 transition-colors underline underline-offset-4" style={{ fontFamily: "Courier New, monospace" }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t-[4px] border-black bg-[#EAE8E3]">
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-[#FFF44F] border-[4px] border-black text-black py-5 font-bold uppercase tracking-[0.2em] text-[14px] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700] transition-all"
                  style={{ fontFamily: "Courier New, monospace" }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};
