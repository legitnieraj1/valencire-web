"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

function formatPrice(price: string): string {
  return `₹${price}`;
}

export default function ProductCard({ prod }: { prod: Product }) {
  return (
    <Link href={`/product/${prod.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={prod.image}
          alt={prod.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3 md:mt-4">
        <h3
          className="text-[11px] md:text-xs font-light text-ink lowercase tracking-wide"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {prod.name}
        </h3>
        <p
          className="mt-1 text-[11px] md:text-xs font-light text-stone"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {formatPrice(prod.price)}
        </p>
      </div>
    </Link>
  );
}
