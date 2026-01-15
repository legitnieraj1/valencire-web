"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { cart, isLoading: cartLoading } = useCart();
    const router = useRouter();

    useEffect(() => {
        // Wait for both auth and cart to finish loading
        if (!authLoading && !cartLoading) {
            if (cart.length === 0) {
                router.push("/collection");
            }
        }
    }, [authLoading, cart, cartLoading, router]);

    if (authLoading || cartLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white tracking-widest uppercase text-xs">
                Preparing Ritual... {authLoading ? "(Syncing Identity)" : "(Checking Inventory)"}
            </div>
        );
    }

    if (cart.length === 0) return null;

    return (
        <main className="min-h-screen w-full bg-[#0a0a0a] flex flex-col md:flex-row relative">
            <CheckoutSummary />
            <CheckoutForm />
        </main>
    );
}
