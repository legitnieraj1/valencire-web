"use client";

import { useCart } from "@/components/providers/CartContext";
import Image from "next/image";

export default function CheckoutSummary() {
    const { cart } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping logic for now
    const total = subtotal + shipping;

    return (
        <div className="md:w-1/2 p-6 md:p-12 md:h-screen md:sticky md:top-0 md:flex md:flex-col md:justify-center border-b md:border-b-0 md:border-r border-white/10">
            <h2 className="text-xl font-heading font-bold text-white uppercase tracking-[0.2em] mb-12">
                Your Selection
            </h2>

            <div className="space-y-8 mb-12 flex-grow overflow-auto no-scrollbar max-h-[50vh]">
                {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex items-start gap-6 group">
                        <div className="relative w-20 h-24 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
                            <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        <div className="flex-grow pt-1 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="text-sm font-body text-white tracking-widest uppercase">
                                    {item.name}
                                </h3>
                                <p className="text-sm font-mono text-gray-400">
                                    ${item.price * item.quantity}
                                </p>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 uppercase tracking-wider">
                                <span>Size: {item.selectedSize}</span>
                                <span>Qty: {item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4 text-sm tracking-widest uppercase">
                <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-4">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    );
}
