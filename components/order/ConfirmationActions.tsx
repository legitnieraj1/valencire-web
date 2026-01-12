"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ConfirmationActions() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-6"
        >
            <Link
                href="/collection"
                className="group relative px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-gray-200 transition-all duration-500"
            >
                Return to the World
            </Link>

            <Link
                href="/account"
                className="text-[10px] text-gray-500 uppercase tracking-[0.25em] hover:text-white transition-colors duration-300 flex items-center gap-2 group"
            >
                View Account
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
        </motion.div>
    );
}
