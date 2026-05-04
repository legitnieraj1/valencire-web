"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden">
      {/* Campaign image */}
      <Image
        src="/oldmoney pics/main hero-bg.png"
        alt="Valenciré campaign"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Warm fade to paper at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F7F3EE] pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-[100px] md:w-[140px] h-[60px] md:h-[84px] mt-[-10vh]">
          <Image
            src="/images/logo_final.png"
            alt="Valenciré"
            fill
            className="object-contain invert brightness-200"
            priority
          />
        </div>
        <p
          className="mt-6 text-xs md:text-sm tracking-[0.15em] text-white/80 italic"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          drop 01 — summer 2026
        </p>
      </div>

      {/* Scroll chevron */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-50"
        }`}
      >
        <span
          className="block text-white text-2xl animate-chevron"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          &#8744;
        </span>
      </div>
    </section>
  );
}
