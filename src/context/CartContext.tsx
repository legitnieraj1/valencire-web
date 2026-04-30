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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-[-12px_0px_0px_rgba(0,0,0,1)] flex flex-col border-l-4 border-black transform transition-transform duration-300">
            <div className="p-8 border-b-4 border-black flex justify-between items-center bg-[#FFF44F]">
              <h2 className="text-[16px] font-bold uppercase tracking-[0.2em] text-black" style={{ fontFamily: "Courier New, monospace" }}>Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-[13px] font-bold uppercase tracking-widest text-black hover:text-gray-700 transition-colors" style={{ fontFamily: "Courier New, monospace" }}>[X] Close</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-[#FAF8F5]">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-[14px] text-black font-bold uppercase tracking-widest" style={{ fontFamily: "Courier New, monospace" }}>Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 border-b-2 border-black pb-6 last:border-b-0">
                    <img src={item.image} alt={item.name} className="w-24 h-32 object-contain bg-[#EAE8E3] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                    <div className="flex-1 pt-1">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest leading-tight text-black" style={{ fontFamily: "Courier New, monospace" }}>{item.name}</h3>
                      <p className="text-[13px] text-gray-800 mt-2 font-bold" style={{ fontFamily: "Courier New, monospace" }}>RS. {item.price}.00</p>
                      <div className="flex gap-4 mt-3">
                        <span className="text-[11px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Size: {item.size}</span>
                        <span className="text-[11px] text-black uppercase tracking-widest font-bold" style={{ fontFamily: "Courier New, monospace" }}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-[11px] uppercase font-bold tracking-widest text-red-600 hover:text-black transition-colors pt-1" style={{ fontFamily: "Courier New, monospace" }}>Remove</button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t-4 border-black bg-[#EAE8E3]">
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-[#FFF44F] border-4 border-black text-black py-5 font-bold uppercase tracking-[0.2em] text-[14px] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700] transition-all"
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
