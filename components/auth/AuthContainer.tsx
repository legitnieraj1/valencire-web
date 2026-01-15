"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AuthContainer({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Subtle noise texture overlay if needed, sticking to minimal black for now */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-md flex flex-col items-center space-y-10 z-10"
            >
                {children}
            </motion.div>
        </main>
    );
}
