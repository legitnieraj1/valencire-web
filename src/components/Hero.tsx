"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "/images/hero-1.png",
    mobileImage: "/images/heromobile.jpg",
    cta: {
      label: "SHOP COLLECTION",
      href: "/collections/jeans",
      position: "bottom-16 md:bottom-[21.5%] left-6 md:left-[7%]"
    },
    products: [
      {
        title: "Pleated Pants",
        desc: "Movement with meaning.",
        href: "/collections/trousers?sort=pleated-pants",
      },
      {
        title: "Boot Cut Pants",
        desc: "Structured flow.\nTimeless edge.",
        href: "/collections/jeans?sort=bootcut",
      },
    ],
  },
  {
    image: "/images/hero-3.png",
    mobileImage: "/images/hero-2-mobile.jpg",
    cta: {
      label: "SHOP SHIRTS",
      href: "/collections/shirts",
      position: "bottom-20 md:bottom-[16%] left-6 md:left-[4%]"
    },
    products: [],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (idx: number, dir?: "left" | "right") => {
      if (isAnimating || idx === current) return;
      const resolvedDir = dir ?? (idx > current ? "left" : "right");
      setDirection(resolvedDir);
      setPrev(current);
      setCurrent(idx);
      setIsAnimating(true);
      timeoutRef.current = setTimeout(() => {
        setPrev(null);
        setIsAnimating(false);
      }, 800);
    },
    [isAnimating, current]
  );

  const goNext = useCallback(
    () => goTo((current + 1) % SLIDES.length, "left"),
    [current, goTo]
  );
  const goPrev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length, "right"),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const slide = SLIDES[current];

  // CSS class helpers for the sliding effect
  const getSlideClass = (idx: number) => {
    if (idx === current) {
      // Entering slide — start offset, animate to 0
      return direction === "left"
        ? "z-20 translate-x-0 transition-transform duration-[800ms] ease-in-out"
        : "z-20 translate-x-0 transition-transform duration-[800ms] ease-in-out";
    }
    if (idx === prev) {
      // Exiting slide — animate away
      return direction === "left"
        ? "z-10 -translate-x-full transition-transform duration-[800ms] ease-in-out"
        : "z-10 translate-x-full transition-transform duration-[800ms] ease-in-out";
    }
    return "z-0 opacity-0";
  };

  const getEnterClass = (idx: number) => {
    if (idx === current && prev !== null) {
      return direction === "left" ? "animate-slide-in-right" : "animate-slide-in-left";
    }
    return "";
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] min-h-[500px] bg-[#f1ece5] overflow-hidden">

      {/* Slides */}
      {SLIDES.map((s, idx) => {
        const isActive = idx === current;
        const isExiting = idx === prev;
        const isVisible = isActive || isExiting;

        if (!isVisible) return null;

        return (
          <div
            key={idx}
            className={`absolute inset-0 ${getSlideClass(idx)} ${getEnterClass(idx)}`}
          >
            <Image
              src={s.image}
              alt={`Valencire Campaign ${idx + 1}`}
              fill
              className="object-cover object-center hidden md:block"
              priority={idx === 0}
            />
            <Image
              src={s.mobileImage}
              alt={`Valencire Campaign Mobile ${idx + 1}`}
              fill
              className="object-cover object-center block md:hidden"
              priority={idx === 0}
            />
          </div>
        );
      })}

      {/* Content overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* CTA Button */}
        <div className={`absolute ${slide.cta.position} pointer-events-auto`}>
          <Link
            href={slide.cta.href}
            className="group flex items-center justify-center border-[0.5px] border-black/80 bg-transparent text-black/80 px-8 py-3 text-[11px] md:text-xs font-light lowercase tracking-[0.25em] transition-colors duration-300 hover:border-black hover:text-black"
          >
            {slide.cta.label}
            <ArrowRight className="w-3 h-3 ml-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1} />
          </Link>
        </div>

        {/* Product Info Cards */}
        {slide.products.length > 0 && (
          <div className="absolute bottom-6 md:bottom-12 right-4 md:right-[17.5%] flex items-start gap-8 md:gap-44 pointer-events-auto">
            {slide.products.map((p, pIdx) => (
              <div key={pIdx} className="flex items-start gap-8">
                {pIdx > 0 && <div className="w-[1px] h-16 bg-black/20 mt-1" />}
                <div className="flex flex-col text-black">
                  <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase mb-2">{p.title}</h3>
                  <p className="text-[10px] md:text-xs text-gray-800 mb-6 whitespace-pre-line">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="group flex items-center justify-center border-[0.5px] border-black/80 text-black/80 px-5 py-2 text-[9px] md:text-[10px] font-light lowercase tracking-[0.2em] transition-colors duration-300 hover:border-black hover:text-black w-fit"
                  >
                    shop now
                    <ArrowUpRight className="w-2.5 h-2.5 ml-3 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" strokeWidth={1} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1.5 shadow-sm pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === current ? "bg-black scale-110" : "bg-black/25 hover:bg-black/50"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
