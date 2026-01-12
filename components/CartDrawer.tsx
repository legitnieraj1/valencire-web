"use client";

import { useCart } from "@/components/providers/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
    const { cart, isOpen, closeCart, removeFromCart } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 transition-opacity"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 p-8 flex flex-col shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
                            <h2 className="font-heading text-lg tracking-[0.2em] text-white uppercase">Your Arsenal</h2>
                            <button
                                onClick={closeCart}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                    <p className="font-body text-sm tracking-widest uppercase">Your soul is unarmed.</p>
                                    <Link
                                        href="/collection"
                                        onClick={closeCart}
                                        className="mt-6 text-white border-b border-white pb-1 text-xs tracking-widest uppercase hover:text-gray-300 transition-colors"
                                    >
                                        View Collection
                                    </Link>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                        <div className="relative w-20 h-28 bg-gray-900 border border-white/5">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover opacity-80"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-sm font-heading tracking-wider text-white uppercase">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 font-mono">${item.price}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                                                    Size: {item.selectedSize}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                className="self-start text-[10px] text-red-900/80 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="mt-8 border-t border-white/10 pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs text-gray-400 tracking-widest uppercase">Subtotal</span>
                                    <span className="text-lg font-heading tracking-widest text-white">
                                        ${subtotal}
                                    </span>
                                </div>
                                <Link href="/checkout" onClick={closeCart} className="block w-full text-center bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-colors duration-300">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
