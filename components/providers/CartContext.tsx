"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "@/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, getCart } from "@/lib/actions/cart";

interface CartContextType {
    cart: CartItem[];
    isOpen: boolean;
    isLoading: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addToCart: (product: Product, size: string) => Promise<void>;
    removeFromCart: (productId: string, size: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, isLoading: authLoading } = useAuth();

    // Fetch cart on load/auth change
    useEffect(() => {
        if (authLoading) return; // Wait for auth to settle

        if (!user) {
            // Load from local storage for guests
            const storedCart = localStorage.getItem("guest_cart");
            if (storedCart) {
                try {
                    setCart(JSON.parse(storedCart));
                } catch (e) {
                    console.error("Failed to parse cart from local storage", e);
                }
            }
            setIsLoading(false);
            return;
        }

        const fetchCart = async () => {
            setIsLoading(true);
            try {
                const serverCart = await getCart();
                if (serverCart && serverCart.cart_items) {
                    // Map DB structure to CartItem type
                    const mappedItems: CartItem[] = serverCart.cart_items.map((item: any) => ({
                        id: item.products.id || item.product_id, // Fallback if join issue
                        name: item.products.name,
                        price: item.products.price,
                        description: "", // DB doesn't fetch this yet, optional
                        details: [],
                        images: [item.products.image_url], // Simplified
                        sizes: [],
                        category: "tops",
                        slug: item.products.slug,
                        selectedSize: "One Size", // DB schema needs size column! For now default.
                        quantity: item.quantity
                    }));
                    setCart(mappedItems);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [user, authLoading]);

    // Save to local storage whenever cart changes
    useEffect(() => {
        if (!isLoading) { // Avoid overwriting with empty array during initial load
            localStorage.setItem("guest_cart", JSON.stringify(cart));
        }
    }, [cart, isLoading]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const addToCart = async (product: Product, size: string) => {
        // Optimistic UI update
        setCart((prev) => {
            const existing = prev.find((p) => p.id === product.id && p.selectedSize === size);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id && p.selectedSize === size
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, selectedSize: size, quantity: 1 }];
        });
        setIsOpen(true);

        // Server Sync
        if (user) {
            await addToCartAction(product.id, 1); // Size not yet in DB schema!
        }
    };

    const removeFromCart = async (productId: string, size: string) => {
        // Optimistic UI update
        setCart((prev) => prev.filter((p) => !(p.id === productId && p.selectedSize === size)));

        // Server Sync (Skipped complex logic for now as per MVP)
        // ideally call server action
    };

    return (
        <CartContext.Provider
            value={{ cart, isOpen, isLoading, openCart, closeCart, toggleCart, addToCart, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
