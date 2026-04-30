"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import Link from "next/link";

const mono = "'Courier New', Courier, monospace";
const sf = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

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

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const addToCart = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
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

  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, isCartOpen, setIsCartOpen }}>
      {children}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[400px] flex flex-col bg-[#FAF8F5] border-l-[5px] border-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-[5px] w-full bg-[#FFF44F] flex-shrink-0" />

        {/* Header */}
        <div className="px-7 py-5 bg-[#EAE8E3] border-b-[4px] border-black flex justify-between items-start flex-shrink-0">
          <div>
            <p className="text-[9px] tracking-[0.45em] uppercase text-gray-500 mb-1" style={{ fontFamily: mono }}>
              Valenciré — Est. 2024
            </p>
            <h2 className="text-[26px] font-semibold text-black leading-tight" style={{ fontFamily: sf }}>
              Your Bag
            </h2>
            {cartCount > 0 && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mt-1" style={{ fontFamily: mono }}>
                {cartCount} item{cartCount !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 border-[3px] border-black bg-[#FFF44F] shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center mt-1"
            aria-label="Close"
          >
            {/* X icon via SVG — no emoji */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20">
              {/* Neo-brutalist empty state box */}
              <div className="w-20 h-20 border-[4px] border-black bg-[#EAE8E3] shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div className="border-l-[4px] border-black pl-4 text-left">
                <p className="text-[16px] font-semibold text-black leading-snug" style={{ fontFamily: sf }}>
                  Your bag is empty
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mt-1" style={{ fontFamily: mono }}>
                  Add items to get started
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="border-[3px] border-black bg-[#FFF44F] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-black"
                style={{ fontFamily: mono }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item.id}-${item.size}`}
                className={`flex gap-5 py-6 ${i < items.length - 1 ? "border-b-[3px] border-black" : ""}`}
              >
                {/* Image — offset shadow frame */}
                <div className="relative w-[80px] h-[100px] flex-shrink-0">
                  <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-black" />
                  <div className="relative w-full h-full border-[3px] border-black bg-[#EAE8E3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain filter sepia-[0.15]"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[14px] font-semibold text-black leading-snug" style={{ fontFamily: sf }}>
                      {item.name}
                    </h3>
                    <p className="text-[15px] font-bold text-black mt-1" style={{ fontFamily: mono }}>
                      RS. {item.price}.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-[#EAE8E3] border-[2px] border-black px-2 py-0.5" style={{ fontFamily: mono }}>
                        Sz {item.size}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-[#EAE8E3] border-[2px] border-black px-2 py-0.5" style={{ fontFamily: mono }}>
                        x{item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-red-600 transition-colors border-b-2 border-black hover:border-red-600"
                      style={{ fontFamily: mono }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-[4px] border-black bg-[#EAE8E3] flex-shrink-0">
            {/* Subtotal row */}
            <div className="px-7 pt-5 pb-4 flex justify-between items-baseline border-b-[2px] border-black/20">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600" style={{ fontFamily: mono }}>
                Subtotal
              </span>
              <span className="text-[22px] font-bold text-black" style={{ fontFamily: mono }}>
                RS. {subtotal.toLocaleString()}.00
              </span>
            </div>

            {/* CTA */}
            <div className="px-7 py-5">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full bg-[#FFF44F] border-[4px] border-black text-black py-4 text-[13px] font-bold uppercase tracking-[0.25em] text-center shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-[#FFD700] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                style={{ fontFamily: mono }}
              >
                Proceed to Checkout
              </Link>
              <div className="mt-4 flex items-center justify-center gap-6">
                {["Free Shipping", "Secure Pay", "Easy Returns"].map((t, i) => (
                  <span key={t} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-gray-400 text-[10px]">|</span>}
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500" style={{ fontFamily: mono }}>{t}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};
