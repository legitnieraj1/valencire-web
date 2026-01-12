"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartContext";
import { useAuth } from "@/components/providers/AuthProvider";
import { ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { toggleCart, cart } = useCart();
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes works automatically if using Link, 
    // but good to ensure simple click toggles it off too.

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-40 px-6 py-5 flex justify-between items-center transition-colors duration-500 ease-in-out ${isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
                    }`}
            >
                {/* Left Links (Desktop) */}
                <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] font-light font-body uppercase text-gray-300">
                    <Link href="/collection" className="hover:text-white transition-colors duration-300">
                        Collection
                    </Link>
                    <Link href="/philosophy" className="hover:text-white transition-colors duration-300">
                        Philosophy
                    </Link>
                    <Link href={user ? "/account" : "/auth/login"} className="hover:text-white transition-colors duration-300">
                        Account
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-white relative z-50 p-2 -ml-2"
                >
                    {isMobileMenuOpen ? "CLOSE" : <Menu className="w-5 h-5" />}
                </button>

                {/* Center Logo */}
                <Link
                    href="/"
                    className="absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 hover:opacity-80"
                >
                    <div className="relative w-[300px] h-[100px] md:w-[500px] md:h-[160px]">
                        <Image
                            src="/LOGO BRO.png"
                            alt="VALENCIRÉ"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Right Cart */}
                <button onClick={toggleCart} className="relative group text-white z-50">
                    <ShoppingBag
                        className="w-5 h-5 group-hover:text-gray-400 transition-colors duration-300"
                        strokeWidth={1}
                    />
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        <Link
                            href="/"
                            onClick={toggleMobileMenu}
                            className="text-2xl font-heading font-bold tracking-[0.2em] text-white"
                        >
                            VALENCIRÉ
                        </Link>

                        <div className="h-px w-12 bg-white/20" />

                        <nav className="flex flex-col items-center gap-6 text-sm tracking-[0.3em] font-light text-gray-300 uppercase">
                            <Link href="/collection" onClick={toggleMobileMenu} className="hover:text-white">
                                Collection
                            </Link>
                            <Link href="/philosophy" onClick={toggleMobileMenu} className="hover:text-white">
                                Philosophy
                            </Link>
                            <Link href={user ? "/account" : "/auth/login"} onClick={toggleMobileMenu} className="hover:text-white">
                                Account
                            </Link>
                            <Link href="/cart" onClick={() => { toggleMobileMenu(); toggleCart(); }} className="hover:text-white">
                                Cart
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
