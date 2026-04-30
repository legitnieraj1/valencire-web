"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "/images/hero-1.png",
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
              src={s.image.replace('.png', '-mobile.png')}
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
            className="group relative flex items-center justify-center bg-[#FFF44F] border-4 border-black text-black px-8 py-5 text-[12px] md:text-[14px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none hover:bg-[#FFD700]"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            <span className="relative z-10 flex items-center">
              {slide.cta.label}
              <ArrowRight className="w-5 h-5 ml-4 stroke-[3px] transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </Link>
        </div>

        {/* Product Info Cards */}
        {slide.products.length > 0 && (
          <div className="absolute bottom-6 md:bottom-12 right-4 md:right-[17.5%] flex items-start gap-8 md:gap-44 pointer-events-auto">
            {slide.products.map((p, pIdx) => (
              <div key={pIdx} className="flex items-start gap-8">
                {pIdx > 0 && <div className="w-[1px] h-16 bg-black/20 mt-1" />}
                <div className="flex flex-col text-black">
                  <h3 className="text-[13px] md:text-[15px] font-bold tracking-widest uppercase mb-2 bg-[#FFF44F] border-2 border-black inline-block px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]" style={{ fontFamily: "Courier New, monospace" }}>{p.title}</h3>
                  <p className="text-[11px] md:text-[13px] text-black font-bold mb-6 whitespace-pre-line" style={{ fontFamily: "Courier New, monospace" }}>{p.desc}</p>
                  <Link
                    href={p.href}
                    className="group text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] relative inline-flex items-center w-fit pb-1 text-black hover:text-gray-600 transition-colors"
                    style={{ fontFamily: "Courier New, monospace" }}
                  >
                    SHOP NOW
                    <ArrowUpRight className="w-4 h-4 ml-2 stroke-[3px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#EAE8E3] border-4 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] pointer-events-auto">
          <button onClick={goPrev} className="text-black hover:text-gray-500 transition-colors">
            <ChevronLeft className="w-5 h-5 stroke-[3px]" />
          </button>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 border-2 border-black transition-all duration-300 ${idx === current ? "bg-[#FFF44F] scale-110 shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-gray-200"
                }`}
            />
          ))}
          <button onClick={goNext} className="text-black hover:text-gray-500 transition-colors">
            <ChevronRight className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
