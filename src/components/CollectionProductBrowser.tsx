"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

function priceValue(product: Product) {
  return Number(product.price.replace(/,/g, ""));
}

export default function CollectionProductBrowser({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const sortedProducts = useMemo(() => {
    const nextProducts = [...products];
    if (sortMode === "price-asc") return nextProducts.sort((a, b) => priceValue(a) - priceValue(b));
    if (sortMode === "price-desc") return nextProducts.sort((a, b) => priceValue(b) - priceValue(a));
    if (sortMode === "newest") return nextProducts.reverse();
    return nextProducts;
  }, [products, sortMode]);

  return (
    <>
      <div className="mb-12 flex items-center justify-between border-y border-line py-4">
        <span
          className="text-xs font-light text-stone"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {products.length} pieces
        </span>
        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
          className="max-w-[190px] cursor-pointer bg-transparent text-right text-xs font-light text-ink outline-none"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-label="Sort products"
        >
          <option value="featured">sort: featured</option>
          <option value="price-asc">price: low to high</option>
          <option value="price-desc">price: high to low</option>
          <option value="newest">newest</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {sortedProducts.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
          ))}
        </div>
      ) : (
        <div className="mb-24 border-y border-line bg-cream px-6 py-16 text-center md:mb-0 md:py-24">
          <p
            className="text-xs font-light uppercase tracking-[0.2em] text-stone mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            coming soon
          </p>
          <h3
            className="text-3xl md:text-4xl font-light italic text-ink"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            arriving soon.
          </h3>
          <p
            className="mx-auto mt-4 max-w-md text-sm font-light leading-[1.7] text-stone"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            the {title.toLowerCase()} selection is being refined and will arrive soon.
          </p>
          <Link
            href="/"
            className="link-cta mt-8 inline-block text-xs"
          >
            return to the collection &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
