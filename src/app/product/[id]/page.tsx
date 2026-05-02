"use client";

import { getProductById } from "@/data/products";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function formatPrice(price: string): string {
  return `₹${price}`;
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  if (!product) {
    return notFound();
  }

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayImages = product.images && product.images.length > 0 ? [product.image, ...product.images] : [product.image];

  return (
    <div className="min-h-screen bg-paper pt-8 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-2 text-xs font-light text-stone mb-12"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <Link href="/" className="hover:text-ink transition-colors">home</Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-ink transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
              {displayImages.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                  priority={idx === 0}
                />
              ))}
            </div>

            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`relative w-16 h-20 flex-shrink-0 overflow-hidden bg-cream transition-opacity ${
                      imageIndex === idx ? "opacity-100 border-b border-ink" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center max-w-md">
            <h1
              className="text-3xl md:text-4xl font-light text-ink tracking-[-0.02em] lowercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {product.name}
            </h1>
            <p
              className="mt-3 text-sm font-light text-stone"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {formatPrice(product.price)}
            </p>

            <div className="w-12 h-px bg-line my-8" />

            <p
              className="text-sm font-light text-stone leading-[1.7]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              expertly crafted from heritage fabrics, this garment honors traditional tailoring. the robust, textural weave guarantees durability while naturally softening over time.
            </p>

            {/* Size Selection */}
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <p
                  className="text-xs font-light uppercase tracking-[0.15em] text-stone"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  select size
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3 text-xs font-light uppercase tracking-wide border transition-all duration-300 ${
                      selectedSize === size
                        ? "border-ink text-ink bg-paper"
                        : "border-line text-stone hover:border-ink hover:text-ink"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p
                  className="text-xs font-light text-[#9B4444] mt-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  please select a size
                </p>
              )}
            </div>

            {/* Add to bag */}
            <button
              onClick={handleAdd}
              className={`mt-8 w-full py-4 text-xs font-light uppercase tracking-[0.15em] border transition-all duration-300 flex items-center justify-center gap-2 ${
                added
                  ? "border-bark bg-bark text-paper"
                  : "btn-primary"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  added to bag
                </>
              ) : (
                "add to bag"
              )}
            </button>

            {/* Accordions */}
            <div className="mt-12 border-t border-line flex flex-col">
              {[
                { title: "details & care", content: "dry clean recommended. do not tumble dry. iron on low heat if necessary. store folded, not hung." },
                { title: "size & fit", content: "designed for a relaxed, considered fit. take your normal size. model is 6'2\" and wears size L." },
                { title: "shipping & returns", content: "free standard shipping on all orders. returns accepted within 14 days of delivery in original condition." },
              ].map((item) => (
                <div key={item.title} className="border-b border-line">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.title ? null : item.title)}
                    className="w-full py-5 flex justify-between items-center text-left"
                  >
                    <span
                      className="text-xs font-light uppercase tracking-[0.15em] text-ink"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`text-stone text-lg transition-transform duration-300 ${
                        openAccordion === item.title ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openAccordion === item.title ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p
                      className="text-sm font-light text-stone leading-[1.7]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
