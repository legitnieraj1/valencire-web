"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

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

function formatPrice(price: string): string {
  return `₹${price}`;
}

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
        className={`fixed inset-0 z-[99] bg-ink/40 backdrop-blur-sm transition-opacity duration-400 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[380px] flex flex-col bg-paper border-l border-line transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-line flex justify-between items-start flex-shrink-0">
          <div>
            <h2
              className="text-lg font-light text-ink"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              your bag
            </h2>
            {cartCount > 0 && (
              <p
                className="text-[10px] font-light uppercase tracking-[0.15em] text-stone mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-xs font-light uppercase tracking-[0.2em] text-stone hover:text-ink transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-20">
              <p
                className="text-base font-light text-ink"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                your bag is empty
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="link-cta text-xs"
              >
                continue browsing &rarr;
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item.id}-${item.size}`}
                className={`flex gap-4 py-5 ${i < items.length - 1 ? "border-b border-line" : ""}`}
              >
                <div className="relative w-[70px] h-[93px] flex-shrink-0 bg-cream overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-xs font-light text-ink lowercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-xs font-light text-stone mt-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p
                      className="text-[10px] font-light text-stone uppercase tracking-wide"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.size} / qty {item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-[10px] font-light text-stone hover:text-ink transition-colors border-b border-transparent hover:border-ink"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line flex-shrink-0">
            <div className="px-6 py-4 flex justify-between items-baseline">
              <span
                className="text-xs font-light uppercase tracking-[0.15em] text-stone"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                subtotal
              </span>
              <span
                className="text-sm font-light text-ink"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="px-6 pb-6">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary block w-full text-center py-3"
              >
                proceed to checkout
              </Link>
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
