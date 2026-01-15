"use client";

import { motion } from "framer-motion";

export default function OrderConfirmationHero() {
    return (
        <div className="text-center space-y-6 mb-16">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-3xl md:text-5xl tracking-[0.2em] uppercase text-white"
            >
                The Order Is Sealed.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="font-body text-xs md:text-sm text-gray-400 tracking-widest uppercase"
            >
                Your garment is now in motion.
            </motion.p>
        </div>
    );
}
