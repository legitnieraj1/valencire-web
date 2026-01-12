"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function ProductCard({ product }: { product: Product }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <Link href={`/product/${product.slug}`} className="group block" ref={ref}>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6">
                {/* Primary Image */}
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ease-out 
                        ${isInView ? "grayscale-0" : "grayscale"} 
                        md:grayscale 
                        ${product.images[1]
                            ? "md:group-hover:opacity-0"
                            : "md:group-hover:grayscale-0 md:group-hover:scale-105"
                        }
                    `}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Secondary Image (Hover - Desktop Only) */}
                {product.images[1] && (
                    <Image
                        src={product.images[1]}
                        alt={`${product.name} Back`}
                        fill
                        className="object-cover absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <h3 className="text-sm font-heading tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors uppercase">
                    {product.name}
                </h3>
                <span className="text-xs font-mono text-gray-600 tracking-widest">${product.price}</span>
            </div>
        </Link>
    )
}
