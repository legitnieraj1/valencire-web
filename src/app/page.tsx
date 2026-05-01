"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { DENIMS, BEST_SELLERS, JUST_ARRIVED, ALL_PRODUCTS } from "@/data/products";

function ProductSection({ title, subtitle, products, showFilter = false, allProducts = [], scrollableCategories }: any) {
  const [activeFilter, setActiveFilter] = useState("Wide Fit");
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine which products to display
  const pool = allProducts.length > 0 ? allProducts : products;
  let categoryPool = pool;

  if (scrollableCategories) {
    const currentCategory = scrollableCategories[activeIndex].value;
    categoryPool = pool.filter((p: any) => p.category === currentCategory);
  }

  let displayProducts = categoryPool;

  if (showFilter) {
    const subcategoryMap: any = {
      "Wide Fit": "relaxed-fit",
      "Bootcut": "bootcut",
      "Baggy": "relaxed-fit"
    };
    const targetSub = subcategoryMap[activeFilter];
    displayProducts = categoryPool.filter((p: any) => p.subcategory === targetSub).slice(0, 4);
  } else {
    displayProducts = categoryPool.slice(0, 4);
  }

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-10">
      <div className="flex justify-between items-start mb-8">
        <div>
          {subtitle && <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-2">{subtitle}</p>}
          {scrollableCategories ? (
            <div className="flex items-center gap-3">
              <div 
                className="h-[40px] md:h-[48px] overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const index = Math.round(el.scrollTop / el.clientHeight);
                  if (index !== activeIndex && index >= 0 && index < scrollableCategories.length) {
                    setActiveIndex(index);
                  }
                }}
              >
                {scrollableCategories.map((c: any) => (
                  <div key={c.value} className="h-full snap-start flex items-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-light lowercase text-black tracking-tight leading-none">{c.label}</h2>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center text-[#1C1A17]/40 animate-pulse ml-1">
                <ChevronUp className="w-4 h-4 -mb-1" strokeWidth={1.5} />
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
          ) : (
            <h2 className="text-4xl md:text-5xl font-serif font-light lowercase text-black tracking-tight">{title}</h2>
          )}
        </div>
        <div className="flex items-center gap-6 mt-2">
          <Link href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">VIEW ALL</Link>
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

      {/* 1. Jeans/Trousers Scrollable Section */}
      <ProductSection
        subtitle="SHOP BY FIT"
        products={DENIMS}
        showFilter={true}
        allProducts={ALL_PRODUCTS}
        scrollableCategories={[
          { label: "jeans", value: "jeans" },
          { label: "trousers", value: "trousers" },
          { label: "shirts", value: "shirts" }
        ]}
      />

      {/* 2. Best Sellers Section */}
      <ProductSection
        title="Best Sellers"
        products={BEST_SELLERS}
      />

      {/* 4. Valencire Story */}
      <section id="story" className="relative scroll-mt-[120px] py-32 bg-[#EFEADF] animate-fade-up overflow-hidden">
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.45em] text-[#8B6F3A]">the story</p>
              <h2 className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-[#1C1A17] md:text-7xl font-serif">
                from valencia,<br/>in our own language.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#4A453E] md:text-base md:leading-8 lowercase">
              valenciré takes its name from valencia — a city built around art, architecture, and form. we borrow that vocabulary and bring it into indian tailoring. one trouser at a time. one drop at a time. nothing louder than it needs to be.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-5 md:gap-x-6">
            {[
              { src: "/images/pleated_3.png", title: "The Pleat", copy: "the foundation. a wide-leg trouser cut for drape, not for show." },
              { src: "/images/jeans-2-mobile.png", title: "The Denim", copy: "denim, treated like tailoring. weight, fall, and a clean line." },
              { src: "/images/bush_4.png", title: "The Utility", copy: "softer construction. fewer details. the trouser you reach for first." },
              { src: "/images/bootcut_3.png", title: "The Cut", copy: "a longer break, a fuller leg. the silhouette doing the work." },
              { src: "/images/baggy_4.png", title: "The Ease", copy: "relaxed, not loose. volume held in proportion." },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`group relative min-h-[300px] md:min-h-[460px] p-2 md:p-3 bg-[#FDFBF7] shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 hover:shadow-[0_30px_50px_rgba(0,0,0,0.15)] hover:z-20 ${
                  index === 0 ? "col-span-2 md:col-span-1" : ""
                } ${index % 2 === 0 ? "md:translate-y-8 md:rotate-[-2deg]" : "md:-translate-y-4 md:rotate-[2.5deg]"} hover:!rotate-0 hover:scale-[1.03]`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 sepia-[.2] contrast-[1.1] saturate-[.85]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_120%)] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/85 via-[#1C1A17]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[#FDFBF7]">
                    <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.35em] text-[#D4AF78]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-xl font-serif tracking-tight">{item.title}</h3>
                    <p className="mt-2 max-w-[190px] text-[11px] leading-5 text-[#FDFBF7]/80 lowercase">{item.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-28 border-y border-[#1C1A17]/10 py-12 flex flex-col items-center justify-center text-center">
            <p className="max-w-2xl text-2xl font-serif italic leading-tight tracking-tight text-[#1C1A17] md:text-4xl lowercase">
              made for those who dress quietly,<br/>and are noticed anyway.
            </p>
            <Link
              href="/collections/trousers"
              className="mt-8 inline-flex border-b border-[#1C1A17] pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C1A17] transition-colors hover:text-[#8B6F3A] hover:border-[#8B6F3A]"
            >
              view the trousers &rarr;
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
