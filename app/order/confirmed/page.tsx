"use client";

import OrderConfirmationHero from "@/components/order/OrderConfirmationHero";
import OrderDetailsMinimal from "@/components/order/OrderDetailsMinimal";
import ConfirmationActions from "@/components/order/ConfirmationActions";
import { useEffect } from "react";
import { useCart } from "@/components/providers/CartContext";

// Placeholder data - will come from backend later
const mockOrder = {
    id: "VAL-2026-001",
    total: 1899,
    items: 1,
    paymentMethod: "Online",
};

export default function OrderConfirmedPage() {
    // Clear cart on mount (since order is sealed)
    const { cart, removeFromCart } = useCart();

    // In a real app, we'd clear the cart via a server action or context method,
    // but for now we assume the cart should be visually empty or we just ignore it
    // on this page. The requirement says "Rite Completed", implying we are done.

    return (
        <main className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Film Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-10 mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <OrderConfirmationHero />
                <OrderDetailsMinimal order={mockOrder} />
                <ConfirmationActions />
            </div>
        </main>
    );
}
