"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SignatureDrop() {
    const product = products.find((p) => p.id === "11111111-1111-1111-1111-111111111111");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    if (!product) return null;

    return (
        <section className="py-24 md:py-32 px-6 bg-[#0a0a0a] min-h-screen flex items-center justify-center">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden group"
                >
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-out transform md:group-hover:scale-105
                            ${isInView ? "grayscale-0" : "grayscale"}
                            md:grayscale md:group-hover:grayscale-0
                        `}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-start space-y-8"
                >
                    <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-white/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Signature Drop</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight">
                        {product.name}
                    </h2>

                    <p className="text-gray-400 font-body text-sm leading-relaxed max-w-md tracking-wide">
                        {product.description}
                    </p>

                    <Link
                        href={`/product/${product.slug}`}
                        className="group flex items-center gap-4 text-white text-sm tracking-[0.2em] uppercase border-b border-white/20 pb-2 hover:border-white transition-all duration-300"
                    >
                        Enter The Drop
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
