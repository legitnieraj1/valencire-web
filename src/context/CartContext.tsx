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
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-gray-100 transform transition-transform duration-300">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black">Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">Close</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6">
                    <img src={item.image} alt={item.name} className="w-24 h-32 object-cover rounded-xl bg-gray-50" />
                    <div className="flex-1 pt-2">
                      <h3 className="text-[11px] font-bold uppercase tracking-widest leading-tight text-black">{item.name}</h3>
                      <p className="text-[12px] text-gray-500 mt-2">RS. {item.price}.00</p>
                      <div className="flex gap-4 mt-3">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Size: {item.size}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 hover:text-black transition-colors pt-2">Remove</button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-white">
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-black text-white py-5 font-bold uppercase tracking-[0.2em] text-[10px] text-center hover:bg-gray-800 transition-colors"
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
