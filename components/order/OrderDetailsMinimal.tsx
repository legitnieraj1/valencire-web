"use client";

import { motion } from "framer-motion";

interface OrderData {
    id: string;
    total: number;
    items: number;
    paymentMethod: string;
}

export default function OrderDetailsMinimal({ order }: { order: OrderData }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 1.5,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full max-w-sm mx-auto space-y-6 text-center"
        >
            <motion.div variants={item} className="space-y-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Order ID</p>
                <p className="font-mono text-sm text-white tracking-widest">{order.id}</p>
            </motion.div>

            <motion.div variants={item} className="h-px w-12 bg-white/10 mx-auto" />

            <motion.div variants={item} className="space-y-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Amount</p>
                <p className="font-heading text-lg text-white tracking-widest">${order.total}</p>
            </motion.div>

            <motion.div variants={item} className="h-px w-12 bg-white/10 mx-auto" />

            <motion.div variants={item} className="grid grid-cols-2 gap-8">
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">Items</p>
                    <p className="font-mono text-sm text-white">{order.items}</p>
                </div>
                <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-1">Payment</p>
                    <p className="font-mono text-sm text-gray-400">{order.paymentMethod}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
