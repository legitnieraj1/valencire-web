"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { DENIMS, BEST_SELLERS, TOPWEAR, JUST_ARRIVED, ALL_PRODUCTS } from "@/data/products";

function ProductSection({ title, subtitle, products, showFilter = false, allProducts = [] }: any) {
  const [activeFilter, setActiveFilter] = useState("Straight");

  // Determine which products to display based on filter
  let displayProducts = products;
  if (showFilter) {
    const subcategoryMap: any = {
      "Straight": "straight-leg",
      "Bootcut": "bootcut",
      "Baggy": "relaxed-fit"
    };
    const targetSub = subcategoryMap[activeFilter];
    // Find matching products from the allProducts pool (or fallback to passed products)
    const pool = allProducts.length > 0 ? allProducts : products;
    displayProducts = pool.filter((p: any) => p.subcategory === targetSub).slice(0, 4);
  }

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          {subtitle && <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-2">{subtitle}</p>}
          <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">VIEW ALL</Link>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-black transition-colors"><ChevronLeft className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-black transition-colors"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="flex justify-center gap-8 mb-16 text-4xl md:text-5xl font-semibold">
          {["Straight", "Bootcut", "Baggy"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`transition-colors ${activeFilter === filter ? "text-black" : "text-gray-200 hover:text-gray-400"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {displayProducts.length > 0 ? (
          displayProducts.map((prod: any) => (
            <ProductCard key={prod.id} prod={prod} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 py-10 uppercase tracking-widest text-xs font-bold">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white">
      <div className="animate-fade-up">
        <Hero />
      </div>

      {/* 1. Denims Section */}
      <ProductSection
        title="Denims"
        subtitle="SHOP BY FIT"
        products={DENIMS}
        showFilter={true}
        allProducts={ALL_PRODUCTS.filter((p: any) => p.category === "jeans")}
      />

      {/* 2. Best Sellers Section */}
      <ProductSection
        title="Best Sellers"
        products={BEST_SELLERS}
      />

      {/* 3. Topwear Section */}
      <ProductSection
        title="Topwear"
        subtitle="SHOP BY STYLE"
        products={TOPWEAR}
      />

      {/* 4. Editorial Masonry */}
      <section className="py-24 bg-gray-50/30 animate-fade-up">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[850px]">
            <div className="md:col-span-2 relative h-full group overflow-hidden rounded-3xl">
              <Image src="/images/stillhouse.png" alt="Editorial 1" fill className="object-cover transition-opacity duration-[2s] hidden md:block" />
              <Image src="/images/stillhouse-mobile.png" alt="Editorial 1 Mobile" fill className="object-cover transition-opacity duration-[2s] block md:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-16 left-16 text-white">
                <h3 className="text-6xl font-semibold tracking-tight mb-6">The Linen Escape</h3>
                <Link href="#" className="uppercase text-xs font-bold underline underline-offset-8 hover:text-gray-300 transition-colors tracking-widest">Explore Collection</Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 h-full">
              <div className="relative flex-1 group overflow-hidden rounded-3xl shadow-sm">
                <Image src="/images/jeans-2.png" alt="Editorial 2" fill className="object-cover transition-opacity duration-[2s] hidden md:block" />
                <Image src="/images/jeans-2-mobile.png" alt="Editorial 2 Mobile" fill className="object-cover transition-opacity duration-[2s] block md:hidden" />
              </div>
              <div className="relative flex-1 group overflow-hidden bg-white rounded-3xl shadow-sm p-12 flex flex-col justify-center items-center text-center border border-gray-100">
                <h3 className="text-4xl font-semibold text-black tracking-tight mb-6">Unmatched Quality</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-8 leading-relaxed max-w-[280px]">Experience the finest materials tailored to perfection for the modern man.</p>
                <Link href="#" className="uppercase text-[10px] font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors tracking-widest">Read Our Story</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Just Arrived Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-semibold text-black tracking-tighter mb-6">Just Arrived</h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase">Discover the latest in premium menswear.</p>
          </div>
          <Link href="/new-in" className="text-xs font-bold uppercase underline underline-offset-8 hover:text-gray-600 transition-colors tracking-widest">
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {JUST_ARRIVED.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
          ))}
        </div>
      </section>

      {/* 6. Video Section */}
      <section className="w-full relative h-[80vh] bg-black overflow-hidden">
        {/* Looping background video */}
        <video
          src="/videos/The Art of Tailoring _ Cinematic Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        {/* Label */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-center z-10">
          <p className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/50 mb-3">Valencire Films</p>
          <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-white">The Art of Tailoring</h2>
        </div>
      </section>
    </div>
  );
}
