"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { DENIMS, BEST_SELLERS, JUST_ARRIVED, ALL_PRODUCTS } from "@/data/products";

function ProductSection({ title, subtitle, products, showFilter = false, allProducts = [] }: any) {
  const [activeFilter, setActiveFilter] = useState("Wide Fit");

  // Determine which products to display based on filter
  let displayProducts = products;
  if (showFilter) {
    const subcategoryMap: any = {
      "Wide Fit": "relaxed-fit",
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
        <div className="flex justify-start md:justify-center gap-5 sm:gap-7 mb-12 md:mb-16 overflow-x-auto pb-2 text-[1.75rem] sm:text-4xl md:text-5xl font-semibold [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {["Wide Fit", "Bootcut", "Baggy"].map((filter) => (
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

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
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
        allProducts={ALL_PRODUCTS}
      />

      {/* 2. Best Sellers Section */}
      <ProductSection
        title="Best Sellers"
        products={BEST_SELLERS}
      />

      {/* 4. Valencire Story */}
      <section id="story" className="scroll-mt-[120px] py-24 bg-[#f7f5f0] animate-fade-up">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-black/40">About Valencire</p>
              <h2 className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-black md:text-7xl">
                A wardrobe built in quiet chapters.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-black/55 md:text-base md:leading-8">
              Valencire begins with restraint: the clean line of a pleat, the weight of denim, the ease of a wider trouser, and the confidence of pieces that do not ask for attention. Each collection is designed as a modern uniform for movement, proportion, and everyday presence.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-5">
            {[
              { src: "/images/pleated_3.png", title: "The Pleat", copy: "Tailoring gives the first line its discipline." },
              { src: "/images/jeans-2-mobile.png", title: "The Denim", copy: "Texture holds the memory of movement." },
              { src: "/images/bush_4.png", title: "The Utility", copy: "Function is refined until it feels effortless." },
              { src: "/images/bootcut_3.png", title: "The Cut", copy: "A longer silhouette brings quiet drama." },
              { src: "/images/baggy_4.png", title: "The Ease", copy: "Volume becomes comfort, not excess." },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`group relative min-h-[260px] overflow-hidden bg-black md:min-h-[430px] ${
                  index === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.35em] text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 max-w-[190px] text-[11px] leading-5 text-white/70">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-y border-black/10 py-8 md:flex md:items-center md:justify-between">
            <p className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-black md:text-4xl">
              Made for the man who dresses with intention, and leaves the room feeling effortless.
            </p>
            <Link
              href="/collections/trousers"
              className="mt-8 inline-flex border-b border-black pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-colors hover:text-black/50 md:mt-0"
            >
              Explore the uniform
            </Link>
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

        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
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
